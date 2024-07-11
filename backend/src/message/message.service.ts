import { Injectable } from '@nestjs/common';
import { RedisService } from '../cashManager/redis.service';
import { MessageInput } from './dto/message.dto';
import { PrismaService } from '../prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {}

  async getConversationMessages(convId: string): Promise<Message[]> {
    
    let cachedMessages = await this.redisService.get(convId);
    cachedMessages = JSON.parse(cachedMessages);
    if (cachedMessages &&  Array.isArray(cachedMessages)) {
      let convMessages = await this.prismaService.message.findMany({
        where: {
          conversationId: convId,
        },
      });
      convMessages = [...convMessages, ...cachedMessages]
      convMessages = convMessages.filter((message, index, self) =>
          index === self.findIndex((m) => (
              m.id === message.id
          ))
      );
      return convMessages
    }

    const convMessages = await this.prismaService.message.findMany({
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

    const cachedMessages = await this.redisService.get(
      messageInput.conversation,
    );
    let messages = JSON.parse(cachedMessages);
    if (typeof messages === 'object') {
      messages = [newMessage];
    } else {
      messages.push(newMessage);
    }
    await this.redisService.set(
      messageInput.conversation,
      JSON.stringify(messages),
    );
    return newMessage;
  }
}
