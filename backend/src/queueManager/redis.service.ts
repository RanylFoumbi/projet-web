import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisClient } from 'bullmq';
import Redis from 'ioredis';
 
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClient;
 
  onModuleInit() {
    this.initializeRedisClient();
  }
 
  onModuleDestroy() {
    this.redisClient.quit();
  }

  private initializeRedisClient() {
    if (!this.redisClient) {
      this.redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      });
    }
    console.log(this.redisClient)
  }
 
  async get(key: string): Promise<string> {
    this.initializeRedisClient()
    return this.redisClient.get(key);
  }
 
  async set(key: string, value: string): Promise<void> {
    this.initializeRedisClient()
    await this.redisClient.set(key, value);
  }
 
  async del(key: string): Promise<void> {
    this.initializeRedisClient()
    await this.redisClient.del(key);
  }
}