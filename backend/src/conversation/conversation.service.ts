import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { QueueManagerService } from 'src/queueManager/queueManager.service';
import { PrismaService } from 'src/prisma.service';
import { Conversation } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(
    private readonly queueManagerService: QueueManagerService,
    private readonly prismaService: PrismaService,
  ) {}

  async createConversation(
    convDto: CreateConversationDto,
  ): Promise<Conversation> {
    const conversation = await this.prismaService.conversation.create({
      data: {
        name: convDto.name,
        users: { connect: convDto.users.map((userId) => ({ id: userId })) },
        createdAt: new Date(),
      },
    });

    this.queueManagerService.createQueue(conversation.id);
    console.log(
      'Conversation created',
      this.queueManagerService.getQueue(conversation.id),
    );
    return conversation;
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    const conversations = await this.prismaService.conversation.findMany({
      where: {
        users: { some: { id: userId } },
      },
    });
    return conversations || [];
  }

  async deleteConversation(convId: string): Promise<Conversation> {
    const conversation = await this.prismaService.conversation.delete({
      where: { id: convId },
    });
    this.queueManagerService.deleteQueue(convId);
    return conversation;
  }
}
