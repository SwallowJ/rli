import { Model } from "@antv/x6";

const createPort = (position: "left" | "right" | "top" | "bottom" | "line" | "ellipse") => ({
    position,
    attrs: {
        circle: { r: 3, fill: "#fff", stroke: "#000", magnet: true },
    },
});

export const data: Model.FromJSONData = {
    nodes: [
        {
            id: "node1",
            x: 40,
            y: 40,
            width: 80,
            height: 40,
            shape: "rect",
            label: "hello",
            zIndex: 2,
        },
        {
            id: "node2",
            x: 40,
            y: 140,
            width: 80,
            height: 40,
            shape: "ellipse",
            label: "world",
            zIndex: 2,
        },
        {
            id: "node3",
            x: 180,
            y: 140,
            width: 80,
            height: 40,
            shape: "rect",
            zIndex: 2,
            attrs: {
                body: {
                    fill: "#2ECC71",
                    stroke: "#000",
                    strokeDasharray: "10,2",
                },
                label: {
                    text: "Hello",
                    fill: "#333",
                    fontSize: 13,
                },
            },
            ports: [
                {
                    id: "port1",
                    attrs: {
                        circle: { r: 3, fill: "#fff", stroke: "#000", magnet: true },
                    },
                },
            ],
        },
        {
            id: "node4",
            x: 250,
            y: 250,
            width: 80,
            height: 60,
            shape: "rect",
            label: "node4",
            ports: {
                groups: {
                    groupl: createPort("left"),
                    groupr: createPort("right"),
                    groupt: createPort("top"),
                    groupb: createPort("bottom"),
                },

                items: [
                    { id: "portl", group: "groupl" },
                    { id: "portr", group: "groupr" },
                    { id: "portt", group: "groupt" },
                    { id: "portb", group: "groupb" },
                ],
            },
        },
        {
            id: "node5",
            x: 300,
            y: 50,
            shape: "base-Rect",
        },
    ],

    edges: [
        {
            source: "node1",
            target: "node2",
        },
        {
            source: "node2",
            target: {
                cell: "node3",
                port: "port1",
            },
            shape: "double-edge",
        },
        {
            source: "node1",
            target: "node3",
            vertices: [{ x: 180, y: 60 }],
            router: "orth",
            connector: "rounded",
            label: "son",
            attrs: {
                line: {
                    stroke: "red",
                },
            },
        },
    ],
};
