use crate::{
    github_api::{fetch_content, fetch_dir_contents},
    plugin_cache::PluginCache,
    plugin_data::PluginData,
};
use log::{error, info};
use reqwest::Client;
use serde_json::Value;

pub async fn get_repo_plugins(
    plugin_cache: &mut PluginCache,
    client: &Client,
) -> Result<(), Box<dyn std::error::Error>> {
    let contents = match fetch_dir_contents(client, "jspsych", "jsPsych", "packages").await {
        Ok(contents) => contents,
        Err(e) => {
            error!("Failed to fetch repository contents: {}", e.to_string());
            return Err(e);
        }
    };

    info!("got {} items from repository!", contents.len());
    for item in contents {
        if item.name == "jspsych" || item.name == "test-utils" || item.name == "config" {
            continue;
        }

        info!("updating cache for {}/package.json", item.name);

        let content = fetch_content(
            client,
            "jspsych",
            "jsPsych",
            &format!("{}/package.json", item.path),
        )
        .await
        .map_err(|e| e.to_string())?;

        let plugin_json: Value = serde_json::from_str(&content)?;
        let origin = "jspsych".to_string();
        let version = plugin_json["version"].as_str().map(|s| s.to_string());
        let author = plugin_json["author"].as_str().map(|s| s.to_string());
        let description = plugin_json["description"].as_str().map(|s| s.to_string());

        info!(
            "plugin {}, origin: {:?}, version: {:?}, author: {:?}, description: {:?}",
            item.name, origin, version, author, description
        );
        let plugin_data = PluginData::new(item.name, origin, version, author, description);
        plugin_cache.update_plugin(plugin_data);
    }

    Ok(())
}

// todo
pub async fn populate_parameters() {}
