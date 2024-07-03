import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import { RedisService } from './redis.service';

@Injectable()
export class QueueManagerService implements OnModuleInit {
  private queues: Map<string, Queue> = new Map();

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    await this.init();
  }

  private async init() {
    try {
      const queuesJson = await this.redisService.get('queuesMap');
      if (queuesJson) {
        const queuesArray = JSON.parse(queuesJson);
        queuesArray.forEach((queue) => this.setupWorkers(queue));
      }
    } catch (error) {
      console.error('Failed to initialize queues:', error);
    }
  }

  async getQueue(name: string): Promise<Queue> {
    let queue = this.queues.get(name);
    if (!queue) {
      queue = await this.createQueue(name);
    }
    return queue;
  }

  async saveQueuesMap(queuesMap: Map<string, Queue>) {
    const queuesArray = Array.from(queuesMap.keys());
    const queuesJson = JSON.stringify(queuesArray);
    await this.redisService.set('queuesMap', queuesJson);
  }

  async createQueue(name: string): Promise<Queue> {
    const queue = new Queue(name, {
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    });

    this.setupWorkers(name);
    this.queues.set(name, queue);
    await this.saveQueuesMap(this.queues);
    return queue;
  }

  private setupWorkers(queueName: string): void {
    new Worker(
      queueName,
      async (job) => {
        if (job.name === 'sendMessage') {
          return this.sendMessageProcessor(job, queueName);
        } else {
          return this.fetchMessagesProcessor(job);
        }
      },
      {
        connection: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        },
      },
    );
  }

  private async sendMessageProcessor(
    job: any,
    queueName: string,
  ): Promise<void> {
    const oldMessagesJson = await this.redisService.get(queueName);
    const oldMessages = oldMessagesJson ? JSON.parse(oldMessagesJson) : [];
    await this.redisService.set(
      queueName,
      JSON.stringify([...oldMessages, job.data]),
    );
  }

  private async fetchMessagesProcessor(job: any): Promise<void> {
    console.log(job.data);
  }

  async deleteQueue(name: string) {
    const queue = this.queues.get(name);
    if (queue) {
      await queue.close();
      this.queues.delete(name);
      await this.saveQueuesMap(this.queues);
    }
  }
}
