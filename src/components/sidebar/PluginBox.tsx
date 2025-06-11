import { useReactFlow } from "@xyflow/react";
import { PluginBoxProps } from "./sidebarTypes";

export default function PluginBox({ title, description, version, author }: PluginBoxProps) {
    const { addNodes } = useReactFlow();

    const handleClick = () => {
        addNodes({
            id: title,
            type: 'pluginNode',
            position: { x: 0, y: 0 },
            data: { label: title, name: "placeholder" }
        });
    }

    return (
        <>
            <button 
                className="plugin-box"
                onClick={handleClick}
            >
                <div className="plugin-box-header">
                    <p className="plugin-title">{title}</p>
                    <p className="plugin-version">v{version}</p>
                </div>
                <div className="plugin-box-body">
                    <p className="plugin-description">{description}</p>
                    <p className="plugin-author">{author}</p>
                </div>
            </button>
        </>
    );
}