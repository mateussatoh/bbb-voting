import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @HttpCode(201)
  vote(@Body() body: { candidateId: string }) {
    return this.votesService.enqueueVote(body.candidateId);
  }
}
