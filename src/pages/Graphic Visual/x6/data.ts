import { Model } from "@antv/x6";

export const data: Model.FromJSONData = {
    nodes: [
        {
            id: "node1",
            x: 40,
            y: 40,
            shape: "base-rect-node",
            label: "节点-任务1",
        },
        {
            id: "node2",
            x: 40,
            y: 140,
            shape: "base-ellipse-node",
            label: "world",
        },
        {
            id: "node3",
            x: 180,
            y: 140,
            shape: "base-rect-node",
            label: "节点-任务2",
        },
    ],

    edges: [
        {
            source: "node1",
            target: "node2",
            shape: "base-line-edge",
        },
        {
            source: "node2",
            target: {
                cell: "node3",
                port: "port1",
            },
            shape: "base-line-edge",
        },
        {
            source: "node1",
            target: "node3",
            shape: "base-line-edge",
            label: "son",
        },
    ],
};
