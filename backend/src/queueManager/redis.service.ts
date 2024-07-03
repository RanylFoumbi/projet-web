import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    });
  }

  async onModuleInit(): Promise<void> {
    if (this.redisClient.status === 'end') {
      await this.redisClient.connect();
      console.log('Redis client connected successfully');
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.redisClient.quit();
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.redisClient.get(key);
    } catch (error) {
      console.error(`Error getting key ${key} from Redis`, error);
      throw error;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await this.redisClient.set(key, value);
    } catch (error) {
      console.error(`Error setting key ${key} in Redis`, error);
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      console.error(`Error deleting key ${key} from Redis`, error);
      throw error;
    }
  }
}
