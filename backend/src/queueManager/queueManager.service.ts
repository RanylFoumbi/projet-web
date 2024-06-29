import { Injectable } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import { RedisService } from './redis.service';

@Injectable()
export class QueueManagerService {
  constructor(
    private readonly redisService: RedisService
  ){
    this.init();
  }

  private async init() {
    const queuesJson = await this.redisService.get('queuesMap');
    if (queuesJson) {
      const queuesArray = JSON.parse(queuesJson);
      for (const queue of queuesArray) {
        this.setupWorkers(queue);
      }
    }
  }

  private queues: Map<string, Queue> = new Map();

  async getQueue(name: string): Promise<Queue> {
    console.log('==============================================> Getting queue from', this.queues, name)
    return this.queues.get(name);
  }

  async saveQueuesMap(queuesMap: Map<string, Queue>) {
    const queuesArray = Array.from(queuesMap.keys())
    const queuesJson = JSON.stringify(queuesArray);
    await this.redisService.set('queuesMap', queuesJson);
  }

  async createQueue(name: string): Promise<Queue> {
    const queue = new Queue(
      name
      , {
        connection: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        },
      }
    );
  
    this.setupWorkers(name);
    this.queues.set(name, queue);
    await this.saveQueuesMap(this.queues);
    return queue;
  }

  private setupWorkers(queueName: string): void {
    new Worker(queueName, (job) =>{
      if(job.name === 'sendMessage'){
          return this.sendMessageProcessor(job, queueName);
      } else {
          return this.fetchMessagesProcessor(job);
      }
  }, {connection:  {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
  }});
  }


  private sendMessageProcessor(job: any, queueName: string): Promise<void> {
    return new Promise(async (resolve) => {
      setTimeout(() => {
        console.log('==============================================> Message sent')
      }, 5000);
      const oldMessages = await this.redisService.get(queueName);
      if (oldMessages) {
        await this.redisService.set(queueName, JSON.stringify([...oldMessages, job.data]));
      } else {
        await this.redisService.set(queueName, JSON.stringify([job.data]));
      }
      resolve();
    });
  }

  private fetchMessagesProcessor(job: any): Promise<void> {
    return new Promise((resolve) => {
      console.log(job.data);
      resolve();
    });
  }
}