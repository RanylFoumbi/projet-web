import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { JobData } from 'backend/src/types/job';
import { QueueName } from 'backend/src/types/queue';

@Processor(QueueName.HEALTH)
export class HealthConsumer {
  @Process('health')
  async processJob(job: Job<JobData>) {
    console.log('Processing job', job.id);
    return 'OK';
  }

  @OnQueueActive()
  onActive(job: Job<JobData>) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data.title}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job<JobData>) {
    console.log(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  onError(job: Job<JobData>, error: Error) {
    console.log(`Failed job ${job.id} of type ${job.name}: ${error.message}`);
  }
}
