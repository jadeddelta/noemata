import plugins from '../../assets/plugins.json'
import PluginBox from './PluginBox'
import './sidebar.css'

export default function SidebarContainer() {
    return (
        <div className="sidebar">
            {plugins["base"].map((plugin, index) => (
                <PluginBox
                    key={index}
                    title={plugin.name}
                    description={plugin.description}
                    version={plugin.version}
                    author={plugin.author}
                />
            ))}
        </div>
    );
}