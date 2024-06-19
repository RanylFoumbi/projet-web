import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Job } from 'bull';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @Get('/')
  getHealth(): string {
    return 'OKrrr';
  }

  @Get('/ping')
  async getJob(): Promise<Job> {
    return await this.healthService.addJobToQueue({
      id: 1,
      title: 'title',
      description: 'description',
      status: 'status',
    });
  }
}
