// src/votes/votes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RedisService } from 'src/redis/redis.service';
import Redis from 'ioredis';

@Injectable()
export class VotesService {
  private readonly redisClient: Redis;
  constructor(
    @InjectQueue('votes-queue') private voteQueue: Queue,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  async getVotes() {
    const votes = await this.redisClient.hgetall('votes');

    return Object.fromEntries(
      Object.entries(votes).map(([key, value]) => [key, parseInt(value, 10)]),
    );
  }

  async enqueueVote(candidateId: string) {
    await this.voteQueue.add('register-vote', { candidateId });

    return { message: 'Voto enfileirado com sucesso!' };
  }
}
