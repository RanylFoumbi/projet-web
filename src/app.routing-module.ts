import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { HealthModule } from './health-check/health.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';

@Module({
  exports: [RouterModule],
  imports: [
    RouterModule.register(routes),
    HealthModule,
    UserModule,
    RoomModule,
    MessageModule,
  ],
})
export class AppRoutingModule {}
