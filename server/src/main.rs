use crate::handlers::post_vote;
use crate::worker::start_vote_processing;
use axum::{Router, routing::post};
use std::sync::Arc;
use tokio::sync::mpsc;

use tracing::info;
use tracing_subscriber::{
    Layer,
    filter::LevelFilter,
    fmt::{self},
    layer::SubscriberExt,
    util::SubscriberInitExt,
};

mod handlers;
mod worker;

pub struct AppState {
    pub sender: mpsc::Sender<String>,
}

#[tokio::main]
async fn main() {
    let file_layer_error = fmt::layer()
        .with_writer(std::fs::File::create("errors.log").unwrap())
        .with_filter(LevelFilter::ERROR);

    let stdout_layer_info_error = fmt::layer().with_filter(LevelFilter::INFO); // Shows INFO, WARN, ERROR, etc. on stdout

    tracing_subscriber::registry()
        .with(file_layer_error)
        .with(stdout_layer_info_error)
        .init();

    info!("Iniciando a aplicação de votação...");

    let (sender, receiver) = mpsc::channel::<String>(1000000);
    info!("Canal de votos criado.");

    let client = redis::Client::open("redis://127.0.0.1/").unwrap();
    info!("Cliente Redis criado.");

    match client.get_multiplexed_async_connection().await {
        Ok(con) => {
            info!("Conexão multiplexada com o Redis estabelecida.");
            let state = Arc::new(AppState { sender });

            // Inicia o processamento dos votos na fila
            start_vote_processing(receiver, con).await;
            info!("Processamento de votos iniciado em background.");

            // Cria as rotas
            let app = Router::new()
                .route("/votes", post(post_vote))
                .with_state(state);
            info!("Rotas da API definidas.");

            let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
            info!("Servidor ouvindo em http://0.0.0.0:3000");
            axum::serve(listener, app).await.unwrap();
            info!("Servidor finalizado.");
        }
        Err(e) => {
            tracing::error!("Erro ao conectar com o Redis: {:?}", e);
        }
    }

    info!("Aplicação finalizada.");
}
