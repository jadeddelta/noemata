import { BaseEdge, EdgeLabelRenderer, EdgeProps, getStraightPath, useReactFlow } from '@xyflow/react';

export default function TrialEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY
    });

    //TODO: change bg-white to whatever we'll have the grid background to be
    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                <div
                    className="nodrag nopan"
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        position: 'absolute',
                        pointerEvents: 'all'
                    }}
                >
                    <button 
                        className="cursor-pointer border-4 rounded-full text-xl bg-amber-200 w-8 h-8 shadow-none p-0 flex items-center justify-center text-black"
                        onClick={() => setEdges((eds) => eds.filter((e) => e.id !== id))}
                    >
                        ×
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    )
}