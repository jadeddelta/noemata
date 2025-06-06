import { useState, useEffect } from 'react';
import { getPluginData, updatePluginCache } from '../../services/repoServices';
import './grid.css';

export default function Grid() {
    const getData = async (str: string) => {
        try {
            const pluginData = await getPluginData(str);
            document.getElementById('woof')!.innerHTML = pluginData;
        } catch (error) {
            console.error('Failed to get plugin data:', error);
        }
    }

    return (
        <div className="grid">
            <input type="text" id="meow" placeholder="Search plugins" />
            <button className="search-button" onClick={async () => {await getData(
                (document.getElementById('meow') as HTMLInputElement).value
            )}}>Search</button>
            <div id="woof">
                hi
            </div>
            <button className="update-setup" onClick={async () => {
                await updatePluginCache();
            }}>Update Plugin Cache</button>
            <button className="update-setup" onClick={async () => {
                console.log()
            }}>test</button>
        </div>
    );
}