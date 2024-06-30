import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService, JwtService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
