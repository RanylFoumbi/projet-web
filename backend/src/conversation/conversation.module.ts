import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [
    ConversationService,
    ConversationResolver,
    PrismaService,
    JwtService,
  ],
  exports: [ConversationService],
})
export class ConversationModule {}
