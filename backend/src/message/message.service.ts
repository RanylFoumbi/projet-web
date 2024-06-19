import { Injectable } from '@nestjs/common';
import { MessageModel } from './entities/message.entity';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { QueueManagerService } from 'src/queueManager/queueManager.service';
import { RedisService } from 'src/queueManager/redis.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly queueManagerService: QueueManagerService,
    private readonly redisService: RedisService,
  ) {}

  private messages: MessageModel[] = [];

  async getRoomMessages(roomId: string): Promise<MessageModel[]> {
    console.log(`Messages for room ${roomId}`);
    const cacheKey = `ROOM_MESSAGES_${roomId}`;
    const cachedMessages = await this.redisService.get(cacheKey);
    if (cachedMessages) {
      return JSON.parse(cachedMessages);
    }
    const romMessages = this.messages.filter(
      (message) => message.room.id === roomId,
    );
    await this.redisService.set(cacheKey, JSON.stringify(romMessages));
    return romMessages
  }

  async sendMessage(
    roomId: string,
    senderId: string,
    content: string,
  ): Promise<MessageModel> {
    console.log(
      `Message sent to room ${roomId} by ${senderId} with content: ${content}`,
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

    const queueName = `ROOM_${roomId}`;
    const queue = await this.queueManagerService.getQueue(queueName);
    
    await queue.add('sendMessage', newMessage);
    this.messages.push(newMessage);
    return newMessage;
  }
}
