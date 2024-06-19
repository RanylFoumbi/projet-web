import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisClient } from 'bullmq';
import Redis from 'ioredis';
 
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClient;
 
  onModuleInit() {
    this.redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
    });
  }
 
  onModuleDestroy() {
    this.redisClient.quit();
  }
 
  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }
 
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }
 
  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}