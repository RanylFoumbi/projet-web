import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomsResolver } from './room.resolvers';
import { UserModule } from 'src/user/user.module';
import { QueueManagerModule } from 'src/queueManager/queueManager.module';
import { QueueManagerService } from 'src/queueManager/queueManager.service';

@Module({
  imports: [
    UserModule,
    QueueManagerModule
  ],
  providers: [RoomService, RoomsResolver, QueueManagerService],
  exports: [RoomService],
})
export class RoomModule {}
