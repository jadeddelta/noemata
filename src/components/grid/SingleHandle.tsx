import { Handle, HandleProps, useNodeConnections } from "@xyflow/react";

export default function SingleHandle(props: HandleProps) {
    const connections = useNodeConnections({
        handleType: props.type,
    })

    return (
        <Handle
            {...props}
            isConnectable={connections.length < 1}
            className="h-4 rounded-none border-none"
        />
    );
}