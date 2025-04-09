// src/votes/votes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class VotesService {
  constructor(@InjectQueue('votes-queue') private voteQueue: Queue) {}

  async enqueueVote(candidateId: string) {
    await this.voteQueue.add('register-vote', { candidateId });
    return { message: 'Voto enfileirado com sucesso!' };
  }
}
