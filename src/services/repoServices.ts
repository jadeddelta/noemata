import { invoke } from "@tauri-apps/api/core";

export async function updatePluginCache(): Promise<void> {
  try {
    await invoke("update_plugin_cache");
  } catch (error) {
    console.error('Failed to update plugin cache:', error);
    throw error;
  }
}

export async function getPluginData(pluginName: string): Promise<any> {
    try {
        const res = await invoke("get_plugin", { name: pluginName }) as string;
        console.log('Plugin data:', res);
        return res;
    } catch (error) {
        console.error('Failed to get plugin data:', error);
        throw error;
    }
}

export async function getPluginsJson(): Promise<any> {
    try {
        return await invoke("get_plugin_json");
    } catch (error) {
        console.error('Failed to get plugins.json:', error);
        throw error;
    }
}