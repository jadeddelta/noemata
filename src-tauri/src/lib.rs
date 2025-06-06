#[allow(unused_imports)]
use log::{debug, error, info, warn};
use reqwest::Client;
use tauri::{AppHandle, Emitter, Manager, State};
use tokio::sync::Mutex;

mod plugin_cache;
use plugin_cache::PluginCache;

mod github_api;

mod gather_data;
use gather_data::get_repo_plugins;

mod plugin_data;
use plugin_data::PluginData;

mod parameter;
use parameter::Parameter;

struct AppState {
    plugin_cache: Mutex<PluginCache>,
    http_client: Client,
}

#[tauri::command]
async fn update_plugin_cache(state: State<'_, AppState>, app: AppHandle) -> Result<(), String> {
    let _api_key = std::env::var("GITHUB_API_KEY");

    // if api_key.is_err() {
    //     warn!("GITHUB_API_KEY not set, skipping repo cache update");
    //     return Ok(());
    // }

    info!("starting repo cache update");
    let mut plugin_cache = state.plugin_cache.lock().await;

    get_repo_plugins(&mut plugin_cache, &state.http_client)
        .await
        .map_err(|e| e.to_string())?;

    info!("finished repo cache update");

    app.emit("cache-finished", plugin_cache.get_cache())
        .unwrap();

    Ok(())
}

#[tauri::command]
async fn get_plugin(name: &str, state: State<'_, AppState>) -> Result<String, String> {
    let plugin_cache = state.plugin_cache.lock().await;
    debug!(
        "{}",
        plugin_cache.get_plugin(name).unwrap().to_string().clone()
    );
    Ok(plugin_cache.get_plugin(name).unwrap().to_string().clone())
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .manage(AppState {
            plugin_cache: Mutex::new(PluginCache::new()),
            http_client: Client::new(),
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            update_plugin_cache,
            get_plugin
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
