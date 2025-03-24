import { useState } from 'react';
import PluginBox from './PluginBox';

export default function PluginAccordion({ name, plugins } : { name: string, plugins: any[] }) {
    const [active, setActive] = useState(false);

    return (
        <div className="plugin-accordion">
            <div className="plugin-accordion-header" onClick={() => setActive(!active)}>
                <h2>{name}</h2>
                <p className="plugin-version">v1.0.0</p>
            </div>
            {active && (plugins.map((plugin, index) => (
                <PluginBox
                    key={index}
                    title={plugin.name}
                    description={plugin.description}
                    version={plugin.version}
                    author={plugin.author}
                />))
            )}
        </div>
    );
}