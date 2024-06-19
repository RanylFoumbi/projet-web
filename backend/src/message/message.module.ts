import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolvers';
import { RoomModule } from 'src/room/room.module';
import { UserModule } from 'src/user/user.module';
import { QueueName } from 'src/types/queue';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.MESSAGE,
    }),
    UserModule,
    RoomModule,
  ],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
