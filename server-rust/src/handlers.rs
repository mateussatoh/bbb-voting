use axum::Json;
use serde::{Deserialize, Serialize};

// Estruturas de dados para votos
#[derive(Debug, Serialize, Deserialize)]
pub struct Vote {
    user_id: Option<String>, // opcional se não for usado no post atual
    candidate_id: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VoteResponse {
    message: String,
}

// Handler para a rota GET de votos
pub async fn get_votes() -> Json<VoteResponse> {
    Json(VoteResponse {
        message: "Lista de votos vai aparecer aqui.".into(),
    })
}

// Handler para a rota POST de votos
pub async fn post_vote(Json(vote): Json<Vote>) -> Json<VoteResponse> {
    println!("Voto recebido: {:?}", vote);
    Json(VoteResponse {
        message: format!("Voto recebido para o candidato {}", vote.candidate_id),
    })
}
