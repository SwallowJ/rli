import { Graph } from "@antv/x6";

const createPort = (position: "left" | "right" | "top" | "bottom" | "line" | "ellipse") => ({
    position,
    attrs: {
        circle: { r: 3, fill: "#fff", stroke: "#000", magnet: true },
    },
});

/**
 * 注册自定义节点/边
 */
export const register = () => {
    Graph.registerNode("base-rect-node", {
        inherit: "rect",
        width: 100,
        height: 40,
        zIndex: 2,
        data: {},
        attrs: {
            body: {
                fill: "#ffffff",
                stroke: "#000",
            },
            label: {
                fill: "#353535",
                fontSize: 13,
            },
        },
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
    });

    Graph.registerNode("base-ellipse-node", {
        inherit: "ellipse",
        width: 100,
        height: 60,
        zIndex: 2,
        data: {},
        attrs: {
            body: {
                fill: "pink",
                stroke: "#000",
            },
            label: {
                fill: "#353535",
                fontSize: 13,
            },
        },
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
    });

    Graph.registerEdge("base-line-edge", {
        inherit: "edge",
        label: "",
        attrs: {
            line: {
                stroke: "#353535",
            },
        },
    });
};
