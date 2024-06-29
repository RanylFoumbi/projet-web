import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolvers';
import { ConversationModule } from 'src/conversation/conversation.module';
import { UserModule } from 'src/user/user.module';
import { QueueManagerModule } from 'src/queueManager/queueManager.module';
import { RedisService } from 'src/queueManager/redis.service';
import { QueueManagerService } from 'src/queueManager/queueManager.service';

@Module({
  imports: [
    UserModule,
    ConversationModule,
    QueueManagerModule
  ],
  providers: [MessageService, MessageResolver, RedisService, QueueManagerService],
  exports: [MessageService, RedisService],
})
export class MessageModule {}
