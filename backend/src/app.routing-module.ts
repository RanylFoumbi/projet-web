import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { HealthModule } from './health-check/health.module';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';

@Module({
  exports: [RouterModule],
  imports: [
    RouterModule.register(routes),
    HealthModule,
    UserModule,
    ConversationModule,
    MessageModule,
  ],
})
export class AppRoutingModule {}
