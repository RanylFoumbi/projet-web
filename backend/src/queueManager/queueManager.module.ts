import { Module } from '@nestjs/common';
import { QueueManagerService } from './queueManager.service';
import { RedisService } from './redis.service';

@Module({
    providers: [QueueManagerService, RedisService],
    exports: [QueueManagerService, RedisService],
})
export class QueueManagerModule {}