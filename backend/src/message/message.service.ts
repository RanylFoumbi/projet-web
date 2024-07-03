import { Injectable } from '@nestjs/common';
import { QueueManagerService } from 'src/queueManager/queueManager.service';
import { RedisService } from 'src/queueManager/redis.service';
import { MessageInput } from './dto/message.dto';
import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(
    private readonly queueManagerService: QueueManagerService,
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {}

  private messages: Message[] = [];

  async getConversationMessages(convId: string): Promise<Message[]> {
    const cachedMessages = await this.redisService.get(convId);
    if (cachedMessages) {
      return JSON.parse(cachedMessages);
    }
    const convMessages = this.prismaService.message.findMany({
      where: {
        conversationId: convId,
      },
    });

    if (convMessages) {
      await this.redisService.set(convId, JSON.stringify(convMessages));
    }

    return convMessages;
  }

  async sendMessage(messageInput: MessageInput): Promise<Message> {
    const newMessage = await this.prismaService.message.create({
      data: {
        content: messageInput.content,
        userId: messageInput.sender,
        conversationId: messageInput.conversation,
      },
    });

    const queue = await this.queueManagerService.getQueue(
      messageInput.conversation,
    );

    await queue.add('sendMessage', newMessage);
    this.messages.push(newMessage);
    return newMessage;
  }
}
