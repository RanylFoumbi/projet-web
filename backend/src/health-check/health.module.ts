import { Module } from '@nestjs/common';
// import { HealthController } from './health.controller';
import { BullModule } from '@nestjs/bull';
import { QueueName } from './queue';
import { HealthConsumer } from './health.consumer';
import { HealthService } from './health.service';
import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.HEALTH,
    }),
  ],
  providers: [HealthConsumer, HealthService, HealthResolver],
})
export class HealthModule {}
