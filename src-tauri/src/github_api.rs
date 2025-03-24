use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct GithubContent {
    pub name: String,
    pub path: String,
    #[serde(rename = "type")]
    pub content_type: String,
    pub download_url: Option<String>,
}

pub async fn fetch_dir_contents(
    client: &Client,
    owner: &str,
    repo: &str,
    path: &str,
) -> Result<Vec<GithubContent>, Box<dyn std::error::Error>> {
    let url = format!(
        "https://api.github.com/repos/{}/{}/contents/{}",
        owner, repo, path
    );

    let response = client
        .get(&url)
        .header("User-Agent", "Tauri-App")
        .send()
        .await?
        .json::<Vec<GithubContent>>()
        .await?;

    Ok(response)
}

pub async fn fetch_content_from_link(
    client: &Client,
    download_url: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    Ok(client.get(download_url).send().await?.text().await?)
}

pub async fn fetch_content(
    client: &Client,
    owner: &str,
    repo: &str,
    path: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let url = format!(
        "https:raw.githubusercontent.com/{}/{}/main/{}",
        owner, repo, path
    );

    Ok(client.get(&url).send().await?.text().await?)
}