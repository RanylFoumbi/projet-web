import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { RedisService } from '../cashManager/redis.service';
import { PrismaService } from '../prisma.service';
import { Message } from '@prisma/client';
import { MessageInput } from './dto/message.dto';

describe('MessageService', () => {
  let service: MessageService;
  let redisService: Partial<RedisService>;
  let prismaService: Partial<PrismaService>;

  const mockDate = new Date('2024-07-10T22:49:28.583Z');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        RedisService,
        PrismaService,
      ],
    })
      .overrideProvider(RedisService)
      .useValue({
        get: jest.fn(),
        set: jest.fn(),
      })
      .overrideProvider(PrismaService)
      .useValue({
        message: {
          findMany: jest.fn(),
          create: jest.fn(),
        },
      })
      .compile();

    service = module.get<MessageService>(MessageService);
    redisService = module.get<RedisService>(RedisService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return cached messages if they exist', async () => {
    const convId = 'testConvId';
    const cachedMessages: Message[] = [
      { id: '1', content: 'Hello', userId: 'user1', conversationId: convId, createdAt: mockDate, updatedAt: mockDate },
    ];

    (redisService.get as jest.Mock).mockResolvedValue(JSON.stringify(cachedMessages));

    const result = await service.getConversationMessages(convId);

    expect(redisService.get).toHaveBeenCalledWith(convId);

    expect(result).toEqual(cachedMessages);
  });

  it('should return messages from database and cache them if no cached messages exist', async () => {
    const convId = 'testConvId';
    const dbMessages: Message[] = [
      { id: '1', content: 'Hello', userId: 'user1', conversationId: convId, createdAt: mockDate, updatedAt: mockDate },
    ];

    (redisService.get as jest.Mock).mockResolvedValue(null);
    (prismaService.message.findMany as jest.Mock).mockResolvedValue(dbMessages);

    const result = await service.getConversationMessages(convId);

    expect(redisService.get).toHaveBeenCalledWith(convId);
    expect(prismaService.message.findMany).toHaveBeenCalledWith({
      where: { conversationId: convId },
    });
    expect(redisService.set).toHaveBeenCalledWith(convId, JSON.stringify(dbMessages));
    expect(result).toEqual(dbMessages);
  });

  it('should create a new message and update the cache', async () => {
    const messageInput: MessageInput = {
      content: 'Hello',
      sender: 'user1',
      conversation: 'testConvId',
    };
    const newMessage: Message = {
      id: '1',
      content: messageInput.content,
      userId: messageInput.sender,
      conversationId: messageInput.conversation,
      createdAt: mockDate,
      updatedAt: mockDate,
    };

    (prismaService.message.create as jest.Mock).mockResolvedValue(newMessage);
    (redisService.get as jest.Mock).mockResolvedValue(JSON.stringify([]));

    const result = await service.sendMessage(messageInput);

    expect(prismaService.message.create).toHaveBeenCalledWith({
      data: {
        content: messageInput.content,
        userId: messageInput.sender,
        conversationId: messageInput.conversation,
      },
    });
    expect(redisService.get).toHaveBeenCalledWith(messageInput.conversation);
    expect(redisService.set).toHaveBeenCalledWith(
      messageInput.conversation,
      JSON.stringify([newMessage]),
    );
    expect(result).toEqual(newMessage);
  });
});
