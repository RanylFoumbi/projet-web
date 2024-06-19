import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { JobData } from '../types/job';
import { QueueName } from '../types/queue';

@Injectable()
export class HealthService {
  constructor(
    @InjectQueue(QueueName.HEALTH) private readonly healthCheckQueue: Queue,
  ) {}

  health(): string {
    return 'OK';
  }

  async addJobToQueue(data: JobData): Promise<Job<JobData>> {
    return await this.healthCheckQueue.add('health', data, {
      attempts: 3,
      timeout: 10000,
      removeOnComplete: true,
    });
  }
}
