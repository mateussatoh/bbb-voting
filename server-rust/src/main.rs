use axum::{
    Router,
    routing::{get, post},
};

mod handlers;
use handlers::{get_votes, post_vote};

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new()
        .route("/votes", get(get_votes))
        .route("/votes", post(post_vote));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
