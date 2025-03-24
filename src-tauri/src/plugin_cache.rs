use crate::plugin_data::PluginData;

pub struct PluginCache {
    pub plugins: Vec<PluginData>,
    pub last_updated: chrono::DateTime<chrono::Utc>,
}

impl PluginCache {
    pub fn new() -> Self {
        Self {
            plugins: Vec::new(),
            last_updated: chrono::Utc::now(),
        }
    }

    pub fn get_plugin(&self, name: &str) -> Option<&PluginData> {
        self.plugins.iter().find(|plugin| plugin.name == name)
    }

    pub fn add_plugin(&mut self, plugin: PluginData) {
        self.plugins.push(plugin);
        self.last_updated = chrono::Utc::now();
    }

    pub fn update_plugin(&mut self, new_plugin: PluginData) {
        for plugin in &mut self.plugins {
            if plugin.name == new_plugin.name {
                plugin.update(new_plugin.version, new_plugin.author, new_plugin.description);
                return;
            }
        }

        // none found, add new plugin
        self.add_plugin(new_plugin);
    }
}