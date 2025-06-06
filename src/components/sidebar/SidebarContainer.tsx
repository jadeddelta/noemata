import { listen } from '@tauri-apps/api/event';
import { useState } from 'react';
import PluginBox from './PluginBox';
import './sidebar.css';
import { PluginData } from '../../services/repoServices';

export default function SidebarContainer() {
    const [pluginData, setPluginData] = useState<PluginData[]>([]);

    listen<PluginData[]>('cache-finished', (event) => {
        console.log('Cache finished:', event.payload);
        setPluginData(event.payload);

        // i don't like this either, but i can't exactly figure out getting 
        // the app data directory from tauri in the rust backend sooooo...
        //TODO: setup saving this cache
    });

    return (
        <div className="sidebar">
            {pluginData.length > 0 ? pluginData.map((plugin, index) => (
                <PluginBox
                    key={index}
                    title={plugin.name}
                    description={plugin.description.split(" ").slice(0, 3).join(" ") + "..."}
                    version={plugin.version}
                    author={plugin.author}
                />
            )) : <div>no plugins...</div>}
        </div>
    );
}