import { Module } from '@nestjs/common';
// import { HealthController } from './health.controller';
import { BullModule } from '@nestjs/bull';
import { HealthConsumer } from './health.consumer';
import { HealthService } from './health.service';
import { HealthResolver } from './health.resolver';
import { QueueName } from 'src/types/queue';


@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.HEALTH,
    }),
  ],
  // controllers: [HealthController],
  providers: [HealthConsumer, HealthService, HealthResolver],
})
export class HealthModule {}
