import { Position, useReactFlow } from "@xyflow/react";
import SingleHandle from "./SingleHandle";

export default function PluginNode({ id, data }: { id: string, data: any}) {
    const { setNodes, setEdges } = useReactFlow();
    
    return (
        <>
            <div className="bg-violet-400 p-4 border-slate-900 border-2 rounded-md relative overflow-hidden">
                <div 
                    className="absolute top-0 left-0 w-6 h-6 bg-red-700 rounded-br-full flex items-center justify-center cursor-pointer border border-slate-900 hover:bg-red-600"
                    role="button"
                    onClick={() => {
                        setNodes(nds => nds.filter(node => node.id !== id));
                        setEdges(eds => eds.filter(ed => ed.source !== id && ed.target !== id));
                    }}
                >
                    <span className="text-white text-xs font-bold relative -top-0.5 -left-0.5">x</span>
                </div>
                <h2>on god i'm a plugin</h2>
                <p className="font-bold">{ data.label ? data.label : "Unknown Plugin" }</p>
                <p className="text-sm">{ data.name ? data.name : "xxxxxx" }</p>
            </div>
            <SingleHandle type="target" position={Position.Left} />
            <SingleHandle type="source" position={Position.Right} />
        </>
    );
}