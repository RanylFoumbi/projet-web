import { IMessage } from 'src/message/message.interface';
import { IUser } from 'src/user/user.interface';

export class IRoom {
  id: string;
  name: string;
  updatedAt?: Date;
  createdAt?: Date;
  creatorId: string;
  participants: IUser[];
  messages: IMessage[];
}
