import { Graph, Model } from "@antv/x6";
import { register } from "./shapeRegistor";
import { RefObject, useEffect, useRef, MutableRefObject } from "react";

export function useX6(data: Model.FromJSONData): [RefObject<HTMLDivElement>, MutableRefObject<Graph | undefined>] {
    const container = useRef<HTMLDivElement>(null);
    const graph = useRef<Graph>();

    /**
     * 鼠标滚轮放大缩小事件
     */
    const onWheel = (e: WheelEvent) => {
        graph.current?.zoom(e.deltaY > 0 ? 0.1 : -0.1);
    };

    const keyUp = (e: KeyboardEvent) => {
        if (e.code == "Space") {
            graph.current?.centerContent();
        }
    };

    useEffect(() => {
        if (container.current) {
            register();
            graph.current = new Graph({
                container: container.current,
                autoResize: true,
                background: {
                    color: "#fffbe6",
                },

                grid: {
                    visible: true,
                },

                panning: {
                    enabled: true,
                    modifiers: "alt",
                },

                selecting: {
                    enabled: true,
                    showNodeSelectionBox: true,
                },

                /**
                 * 剪切板
                 */
                clipboard: {
                    enabled: true,
                    useLocalStorage: true,
                },
                keyboard: true,

                // mousewheel: {
                //     enabled: true,
                //     modifiers: ["alt", "meta"],
                // },
            });

            graph.current.fromJSON(data);

            // graph.current.translate(80, 40);
            // graph.current.resize();

            container.current.addEventListener("wheel", onWheel);
            document.addEventListener("keyup", keyUp);
        }

        return () => {
            document.removeEventListener("keyup", keyUp);
            container.current?.removeEventListener("wheel", onWheel);
            graph.current?.dispose();
        };
    }, []);

    return [container, graph];
}
