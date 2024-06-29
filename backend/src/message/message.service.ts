import { Injectable } from '@nestjs/common';
import { MessageModel } from './entities/message.entity';
import { UserService } from 'src/user/user.service';
import { QueueManagerService } from 'src/queueManager/queueManager.service';
import { RedisService } from 'src/queueManager/redis.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly userService: UserService,
    private readonly queueManagerService: QueueManagerService,
    private readonly redisService: RedisService,
  ) {}

  private messages: MessageModel[] = [];

  async getConversationMessages(convId: string): Promise<MessageModel[]> {
    const cachedMessages = await this.redisService.get(convId);
    if (cachedMessages) {
      return JSON.parse(cachedMessages);
    }
    const convMessages = this.messages.filter(
      (message) => message.conversation.id === convId,
    );
    await this.redisService.set(convId, JSON.stringify(convMessages));
    return convMessages
  }

  async sendMessage(
    convId: string,
    senderId: string,
    content: string,
  ): Promise<MessageModel> {
    console.log(
      `Message sent to conversation ${convId} by ${senderId} with content: ${content}`,
    );

    // const room = await this.roomService.getRoom(roomId);
    const sender = await this.userService.findUserById(senderId);
    const newMessage = new MessageModel();
    newMessage.id = Math.random().toString(36).substring(7);
    newMessage.content = content;
    newMessage.sender = sender;
    newMessage.createdAt = new Date();
    newMessage.updatedAt = new Date();
    //  newMessage.room = room;

    const queue = await this.queueManagerService.getQueue(convId);
    console.log('Queue', queue); 
    
    await queue.add('sendMessage', newMessage);
    this.messages.push(newMessage);
    return newMessage;
  }
}
