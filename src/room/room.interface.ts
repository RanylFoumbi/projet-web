import { IMessage } from 'src/message/message.interface';

export type IRoom = {
  id: string;
  updateAt: Date;
  createdAt: Date;
  creatorId: string;
  messages: IMessage[];
};
