import { ConversationModel } from './entities/conversation.entity';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { QueueManagerService } from 'src/queueManager/queueManager.service';

@Injectable()
export class ConversationService {
  constructor(
    private readonly queueManagerService: QueueManagerService,
  ) {}
  private conversations: ConversationModel[] = [
    {
      id: '1',
      firstParticipant: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      secondParticipant: '2',
      messages: [
        {
          id: '1',
          content: 'Hello',
          createdAt: new Date(),
          updatedAt: new Date(),
          conversation: {
            id: '1',
            firstParticipant: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
            secondParticipant: '2',
            messages: [],
          },
          sender: {
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
            username: 'ra',
            password: '123',
            conversations: [],
          },
        },
      ],
    },
  ];

  async createConversation(convDto: CreateConversationDto): Promise<ConversationModel> {
    const conversation: ConversationModel = {
      id: uuidv4(),
      firstParticipant: convDto.firstParticipant,
      secondParticipant: convDto.secondParticipant,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
    };
    this.conversations.push(conversation);
    this.queueManagerService.createQueue(conversation.id);
    console.log('Conversation created', this.queueManagerService.getQueue(conversation.id));
    return conversation;
  }
  
  async getConversations(userId: string): Promise<ConversationModel[]> {
    return this.conversations.filter(
      (conv) => conv.firstParticipant === userId || conv.secondParticipant === userId,
    );
  }

  async deleteConversation(conversationId: string): Promise<ConversationModel> {
    const conversation = this.conversations.find((conv) => conv.id === conversationId);
    this.conversations = this.conversations.filter((conv) => conv.id !== conversationId);
    return conversation;
  }
}
