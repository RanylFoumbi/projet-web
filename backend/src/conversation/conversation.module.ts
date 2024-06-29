import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolvers';
import { UserModule } from 'src/user/user.module';
import { QueueManagerModule } from 'src/queueManager/queueManager.module';
import { QueueManagerService } from 'src/queueManager/queueManager.service';

@Module({
  imports: [
    UserModule,
    QueueManagerModule
  ],
  providers: [ConversationService, ConversationResolver, QueueManagerService],
  exports: [ConversationService],
})
export class ConversationModule {}
