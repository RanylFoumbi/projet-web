import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { UserModule } from '../user/user.module';
import { ConversationModule } from '../conversation/conversation.module';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, ConversationModule],
  providers: [MessageService, MessageResolver, PrismaService, JwtService],
  exports: [MessageService],
})
export class MessageModule {}
