use std::collections::HashMap;
use std::time::Duration;
use tokio::sync::mpsc::Receiver;
use tokio::task;
use tokio::time::interval;
use tracing::{error, info};

pub async fn process_votes_from_queue(
    mut receiver: Receiver<String>,
    mut con: redis::aio::MultiplexedConnection,
) {
    info!("Worker de processamento de votos em batch iniciado.");

    let mut buffer: HashMap<String, u64> = HashMap::new();
    let mut ticker = interval(Duration::from_secs(1));

    loop {
        tokio::select! {
            Some(vote) = receiver.recv() => {
                *buffer.entry(vote).or_insert(0) += 1;
            }
            _ = ticker.tick() => {
                if buffer.is_empty() {
                    continue;
                }

                let mut pipe = redis::pipe();
                pipe.atomic();

                for (candidate, count) in buffer.drain() {
                    pipe.hincr("votes", candidate, count);
                }

                match pipe.query_async(&mut con).await {
                    Ok(()) => info!("Batch de votos processado com sucesso."),
                    Err(e) => error!("Erro ao processar batch de votos: {:?}", e),
                }
            }
        }
    }
}

pub async fn start_vote_processing(
    receiver: Receiver<String>,
    con: redis::aio::MultiplexedConnection,
) {
    info!("Iniciando o worker de processamento de votos em batch...");
    task::spawn(async move {
        process_votes_from_queue(receiver, con).await;
    });
    info!("Worker de processamento de votos em batch iniciado em background.");
}
