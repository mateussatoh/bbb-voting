import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { VotesService } from './votes.service';
import { interval, from, of } from 'rxjs';
import { switchMap, distinctUntilChanged, catchError } from 'rxjs/operators';
import { isDeepStrictEqual } from 'util';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VotesGateway implements OnGatewayInit {
  @WebSocketServer() io: Server;

  constructor(private readonly votesService: VotesService) {}

  afterInit() {
    interval(1000) // a cada 1 segundo
      .pipe(
        switchMap(() =>
          from(this.votesService.getVotes()).pipe(
            catchError((err) => {
              console.error('Erro ao buscar votos:', err);
              return of({});
            }),
          ),
        ),
        distinctUntilChanged((prev, curr) => isDeepStrictEqual(prev, curr)),
        catchError((err) => {
          console.error('Erro no fluxo do WebSocket:', err);
          return of(null);
        }),
      )
      .subscribe((votes) => {
        if (votes) {
          this.io.emit('votes', votes);
        }
      });
  }
}
