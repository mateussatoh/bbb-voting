// src/votes/votes.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Processor('votes-queue')
@Injectable()
export class VotesProcessor extends WorkerHost {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async process(job: Job): Promise<void> {
    const redis = this.redisService.getClient();

    const { candidateId } = job.data as { candidateId: string };
    await redis.hincrby('votes', candidateId, 1);
  }
}
