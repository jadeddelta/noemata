import { Position } from "@xyflow/react";
import SingleHandle from "./SingleHandle";

export default function StartNode() {
    
    return (
        <>
            <div className="bg-emerald-400 p-4 border border-black rounded-full">
                <h2>start</h2>
                <p className="text-sm">jsPsych</p>
            </div>
            <SingleHandle type="source" position={Position.Right} />
        </>
    );
}