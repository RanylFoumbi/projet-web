import { Module } from '@nestjs/common';
import { HealthModule } from './health-check/health.module';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    UserModule,
    ConversationModule,
    MessageModule,
  ],
})
export class AppRoutingModule {}
