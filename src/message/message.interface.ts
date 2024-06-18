import { IUser } from 'src/user/user.interface';

export type IMessage = {
  id: string;
  content: string;
  sender: IUser;
  roomId: string;
  createdAt: Date;
  updateAt: Date;
};
