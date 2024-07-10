import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { PrismaService } from 'src/prisma.service';
import { Conversation } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createConversation(
    convDto: CreateConversationDto,
  ): Promise<Conversation> {
    const conversation = await this.prismaService.conversation.create({
      data: {
        name: convDto.name,
        creatorId: convDto.creatorId,
        users: { connect: convDto.users.map((userId) => ({ id: userId })) },
      },
    });
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

  async leaveConversation(
    convId: string,
    userId: string,
  ): Promise<Conversation> {
    const conversation = await this.prismaService.conversation.update({
      where: {
        id: convId,
      },
      data: {
        users: { disconnect: { id: userId } },
      },
    });
    return conversation;
  }

  async deleteConversation(
    convId: string,
    userId: string,
  ): Promise<Conversation> {
    const conversation = await this.prismaService.conversation.delete({
      where: {
        id: convId,
        creatorId: userId,
      },
    });
    return conversation;
  }
}
