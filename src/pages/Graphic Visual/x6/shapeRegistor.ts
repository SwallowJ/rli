import { Shape } from "@antv/x6";

const createPort = (position: "left" | "right" | "top" | "bottom" | "line" | "ellipse") => ({
    position,
    attrs: {
        circle: { r: 3, fill: "#fff", stroke: "#000", magnet: true },
    },
});

/**
 * 注册自定义节点
 */
export const register = () => {
    Shape.Rect.define({
        shape: "base-Rect",
        width: 80,
        height: 40,
        label: "新增节点",
        zIndex: 2,
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
};
