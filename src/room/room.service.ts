import { RoomModel } from './entities/room.entity';
import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { IRoom } from './room.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly userService: UserService) {}
  private rooms: IRoom[] = [
    {
      id: '1',
      name: 'Room 1',
      creatorId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      participants: [
        {
          id: '1',
          email: 'ra@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          username: 'ra',
          password: '123',
          profileImg: 'https://example.com',
          rooms: [],
        },
      ],
      messages: [
        {
          id: '1',
          content: 'Hello',
          createdAt: new Date(),
          updatedAt: new Date(),
          room: {
            id: '1',
            name: 'Room 1',
            creatorId: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
            participants: [
              {
                id: '1',
                email: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                username: 'ra',
                password: '123',
                profileImg: 'https://example.com',
                rooms: [],
              },
            ],
            messages: [],
          },
          sender: {
            id: '1',
            email: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            username: 'ra',
            password: '123',
            profileImg: 'https://example.com',
            rooms: [],
          },
        },
      ],
    },
  ];

  async createRoom(createRoomInput: CreateRoomDto): Promise<RoomModel> {
    const participants = await Promise.all(
      createRoomInput.participantIds.map((id) =>
        this.userService.findUserById(id),
      ),
    );
    const room = new RoomModel();
    room.id = uuidv4();
    room.createdAt = new Date();
    room.updatedAt = new Date();
    room.participants = participants;
    room.name = createRoomInput.name;
    room.creatorId = createRoomInput.creatorId;
    return room;
  }

  async getAllRooms(): Promise<IRoom[]> {
    return this.rooms;
  }

  async getUserRooms(userId: string): Promise<IRoom[]> {
    return this.rooms.filter((room) =>
      room.participants.some((participant) => participant.id === userId),
    );
  }

  async getRoom(roomId: string): Promise<IRoom> {
    return this.rooms.find((room) => room.id === roomId);
  }

  async addParticipant(roomId: string, participantId: string): Promise<IRoom> {
    const room = this.rooms.find((room) => room.id === roomId);
    const participant = await this.userService.findUserById(participantId);

    if (!room || !participant) {
      throw new Error('Room or participant not found');
    }
    room.participants.push(participant);
    return room;
  }

  async removeParticipant(
    roomId: string,
    participantId: string,
  ): Promise<IRoom> {
    const room = this.rooms.find((room) => room.id === roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    room.participants = room.participants.filter(
      (participant) => participant.id !== participantId,
    );
    return room;
  }

  async deleteRoom(roomId: string): Promise<IRoom> {
    const room = this.rooms.find((room) => room.id === roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    this.rooms = this.rooms.filter((room) => room.id !== roomId);
    return room;
  }
}
