import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { BullModule } from '@nestjs/bullmq';
import { VotesProcessor } from './votes.processor';
import { RedisModule } from 'src/redis/redis.module';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'votes-queue',
    }),
    BullBoardModule.forFeature({
      name: 'votes-queue',
      adapter: BullMQAdapter,
    }),
    RedisModule,
  ],
  providers: [VotesService, VotesProcessor],
  controllers: [VotesController],
})
export class VotesModule {}
