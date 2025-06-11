import { useState, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    Edge,
    Node
} from '@xyflow/react';
import { getPluginData, updatePluginCache } from '../../services/repoServices';
import './grid.css';
import PluginNode from './PluginNode';
import TrialEdge from './TrialEdge';
import StartNode from './StartNode';

const nodeTypes = {
    pluginNode: PluginNode,
    startNode: StartNode
}

const edgeTypes = {
    trialEdge: TrialEdge
}

const initialNodes: Node[] = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: {},
        type: 'startNode'
    },
]

export default function Grid() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState([] as Edge[]);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (connection: any) => {
            const edge = { ...connection, type: 'trialEdge' };
            setEdges((eds) => addEdge(edge, eds))
        },
        []
    );

    const getData = async (str: string) => {
        try {
            const pluginData = await getPluginData(str);
            document.getElementById('woof')!.innerHTML = pluginData;
        } catch (error) {
            console.error('Failed to get plugin data:', error);
        }
    }

    return (
        <div className="w-[80vw] h-screen flex flex-col">
            <div className="flex ">
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
            <div className="grow text-black bg-slate-100">
                <ReactFlow 
                    nodes={nodes} 
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}