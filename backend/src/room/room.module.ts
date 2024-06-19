import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomsResolver } from './room.resolvers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [RoomService, RoomsResolver],
  exports: [RoomService],
})
export class RoomModule {}
