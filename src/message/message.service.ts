import { Injectable } from '@nestjs/common';
import { MessageModel } from './entities/message.entity';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { IMessage } from './message.interface';

@Injectable()
export class MessageService {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  private messages: IMessage[] = [];

  async getRoomMessages(roomId: string): Promise<MessageModel[]> {
    console.log(`Messages for room ${roomId}`);
    return null;
  }

  async sendMessage(
    roomId: string,
    senderId: string,
    content: string,
  ): Promise<MessageModel> {
    console.log(
      `Message sent to room ${roomId} by ${senderId} with content: ${content}`,
    );

    const room = await this.roomService.getRoom(roomId);
    const sender = await this.userService.findUserById(senderId);
    const newMessage = new MessageModel();
    newMessage.content = content;
    newMessage.sender = sender;
    newMessage.createdAt = new Date();
    newMessage.updatedAt = new Date();
    newMessage.room.id = room.id;
    this.messages.push(newMessage);
    return newMessage;
  }
}
