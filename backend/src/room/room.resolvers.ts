import { Args, ID, Resolver, Query, Mutation } from '@nestjs/graphql';
import { RoomModel } from './entities/room.entity';
import { RoomService } from './room.service';

@Resolver()
export class RoomsResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [RoomModel])
  async getUserRooms(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<RoomModel[]> {
    return this.roomService.getUserRooms(userId);
  }

  @Query(() => RoomModel)
  async getRoom(
    @Args('roomId', { type: () => ID }) roomId: string,
  ): Promise<RoomModel> {
    return this.roomService.getRoom(roomId);
  }

  @Mutation(() => RoomModel)
  async createRoom(
    @Args('name') name: string,
    @Args('creatorId', { type: () => ID }) creatorId: string,
    @Args('participantIds', { type: () => [ID] }) participantIds: string[],
  ): Promise<RoomModel> {
    return this.roomService.createRoom({ name, creatorId, participantIds });
  }

  @Mutation(() => RoomModel)
  async addParticipant(
    @Args('roomId', { type: () => ID }) roomId: string,
    @Args('participantId', { type: () => ID }) participantId: string,
  ): Promise<RoomModel> {
    return this.roomService.addParticipant(roomId, participantId);
  }

  @Mutation(() => RoomModel)
  async removeParticipant(
    @Args('roomId', { type: () => ID }) roomId: string,
    @Args('participantId', { type: () => ID }) participantId: string,
  ): Promise<RoomModel> {
    return this.roomService.removeParticipant(roomId, participantId);
  }

  @Mutation(() => RoomModel)
  async deleteRoom(
    @Args('roomId', { type: () => ID }) roomId: string,
  ): Promise<RoomModel> {
    return this.roomService.deleteRoom(roomId);
  }
}
