import { PluginBoxProps } from "./sidebarTypes";

export default function PluginBox({ title, description, version, author }: PluginBoxProps) {
    return (
        <>
            <div className="plugin-box">
                <div className="plugin-box-header">
                    <p className="plugin-title">{title}</p>
                    <p className="plugin-version">v{version}</p>
                </div>
                <div className="plugin-box-body">
                    <p className="plugin-description">{description}</p>
                    <p className="plugin-author">{author}</p>
                </div>
            </div>
        </>
    );
}