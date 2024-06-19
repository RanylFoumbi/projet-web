import { IRoom } from 'src/room/room.interface';

export class IUser {
  id: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
  profileImg: string;
  rooms: IRoom[];
}
