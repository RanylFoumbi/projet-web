import { IRoom } from 'src/room/room.interface';
import { IUser } from 'src/user/user.interface';

export class IMessage {
  id: string;
  room: IRoom;
  sender: IUser;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
