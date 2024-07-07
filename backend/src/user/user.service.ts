import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import { join } from 'path';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(userId: string, username: string, avatarUrl: string) {
    if (avatarUrl) {
      const oldUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          username,
          avatarUrl,
        },
      });

      if (oldUser.avatarUrl) {
        const imageName = oldUser.avatarUrl.split('/').pop();
        const imagePath = join(
          __dirname,
          '..',
          '..',
          'public',
          'images',
          imageName,
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      return updatedUser;
    }
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        username,
      },
    });
  }

  async getUserById(id: string): Promise<User> {
    let user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User no longer exists');
    }
    return user
  }

  async findUserByName(username: string): Promise<User[]> {
    let users = await this.prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: 'insensitive',
        },
      },
    });
    return users
  }
}
