import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueName } from 'src/types/queue';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolvers';
import { UserModule } from 'src/user/user.module';
import { RoomModule } from 'src/room/room.module';

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
