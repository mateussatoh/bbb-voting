use crate::AppState;
use axum::{
    extract::{Json, State},
    http::StatusCode,
    response::IntoResponse,
};
use serde::Deserialize;
use std::sync::Arc;
use tracing::{error, info};

#[derive(Deserialize)]
pub struct Vote {
    candidate_id: String,
}

pub async fn post_vote(
    State(state): State<Arc<AppState>>,
    Json(vote): Json<Vote>,
) -> impl IntoResponse {
    let vote_str = vote.candidate_id.clone();
    info!(
        "Recebida requisição POST em /votes com o candidato: {}",
        vote_str
    );

    // Envia o voto para a fila local

    match state.sender.try_send(vote.candidate_id) {
        Ok(_) => {
            info!("Voto para '{}' enviado para a fila.", vote_str);
            StatusCode::CREATED
        }
        Err(e) => {
            error!(
                "Fila cheia ou erro ao enfileirar voto '{}': {:?}",
                vote_str, e
            );
            StatusCode::SERVICE_UNAVAILABLE
        }
    }
}
