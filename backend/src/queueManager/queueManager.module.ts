import { Module, Global } from '@nestjs/common';
import { QueueManagerService } from './queueManager.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [QueueManagerService, RedisService],
  exports: [QueueManagerService, RedisService],
})
export class QueueManagerModule {}
