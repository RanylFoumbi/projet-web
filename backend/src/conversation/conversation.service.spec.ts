import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from './conversation.service';
import { PrismaService } from '../prisma.service';
import { Conversation } from '@prisma/client';
import { CreateConversationDto } from './dto/create-conversation.dto';

describe('ConversationService', () => {
  let service: ConversationService;
  let prismaService: Partial<PrismaService>;

  const mockConversation: Conversation = {
    id: 'convId',
    name: 'Test Conversation',
    creatorId: 'creatorId',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({
        conversation: {
          create: jest.fn(),
          findMany: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      })
      .compile();

    service = module.get<ConversationService>(ConversationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a new conversation', async () => {
    const convDto: CreateConversationDto = {
      name: 'New Conversation',
      creatorId: 'creatorId',
      users: ['user1', 'user2'],
    };

    (prismaService.conversation.create as jest.Mock).mockResolvedValue(mockConversation);

    const result = await service.createConversation(convDto);

    expect(prismaService.conversation.create).toHaveBeenCalledWith({
      data: {
        name: convDto.name,
        creatorId: convDto.creatorId,
        users: { connect: convDto.users.map((userId) => ({ id: userId })) },
      },
    });
    expect(result).toEqual(mockConversation);
  });

  it('should get all conversations for a user', async () => {
    const userId = 'userId';
    const conversations: Conversation[] = [mockConversation];

    (prismaService.conversation.findMany as jest.Mock).mockResolvedValue(conversations);

    const result = await service.getConversations(userId);

    expect(prismaService.conversation.findMany).toHaveBeenCalledWith({
      where: {
        users: { some: { id: userId } },
      },
    });
    expect(result).toEqual(conversations);
  });

  it('should remove a user from a conversation', async () => {
    const convId = 'convId';
    const userId = 'userId';

    (prismaService.conversation.update as jest.Mock).mockResolvedValue(mockConversation);

    const result = await service.leaveConversation(convId, userId);

    expect(prismaService.conversation.update).toHaveBeenCalledWith({
      where: { id: convId },
      data: { users: { disconnect: { id: userId } } },
    });
    expect(result).toEqual(mockConversation);
  });

  it('should delete a conversation by the creator', async () => {
    const convId = 'convId';
    const userId = 'creatorId';

    (prismaService.conversation.delete as jest.Mock).mockResolvedValue(mockConversation);

    const result = await service.deleteConversation(convId, userId);

    expect(prismaService.conversation.delete).toHaveBeenCalledWith({
      where: {
        id: convId,
        creatorId: userId,
      },
    });
    expect(result).toEqual(mockConversation);
  });
});
