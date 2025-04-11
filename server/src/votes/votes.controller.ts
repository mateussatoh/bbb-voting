import { Controller, Post, Body } from '@nestjs/common';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  vote(@Body() body: { candidateId: string }) {
    return this.votesService.enqueueVote(body.candidateId);
  }
}
