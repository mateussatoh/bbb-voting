import { Module } from '@nestjs/common';
import { VotesModule } from './votes/votes.module';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { FastifyAdapter } from '@bull-board/fastify';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: FastifyAdapter,
    }),
    VotesModule,
  ],
})
export class AppModule {}
