import { Graph, Model } from "@antv/x6";
import { register } from "./shapeRegistor";
import { RefObject, useEffect, useRef, useState } from "react";

export function useX6(data: Model.FromJSONData): [RefObject<HTMLDivElement>, Graph | undefined] {
    const container = useRef<HTMLDivElement>(null);

    const [graph, setGraph] = useState<Graph>();

    const keyUp = (e: KeyboardEvent) => {
        if (e.code == "Space") {
            graph?.centerContent();
        }
    };

    useEffect(() => {
        if (container.current) {
            register();

            setGraph(
                new Graph({
                    container: container.current,

                    background: {
                        color: "#fffbe6",
                    },

                    grid: {
                        visible: true,
                    },

                    panning: true,

                    selecting: {
                        enabled: true,
                        showNodeSelectionBox: true,
                        showEdgeSelectionBox: true,
                    },

                    /**
                     * 剪切板
                     */
                    clipboard: {
                        enabled: true,
                        useLocalStorage: true,
                    },
                    keyboard: true,

                    mousewheel: {
                        enabled: true,
                        modifiers: ["alt", "meta"],
                    },

                    history: true,

                    snapline: true,

                    resizing: {
                        enabled: true,
                    },

                    rotating: {
                        enabled: true,
                    },

                    connecting: {
                        snap: {
                            radius: 25,
                        },
                        highlight: true,
                    },

                    interacting: {
                        // nodeMovable: false,
                        magnetConnectable: true,
                    },
                })
            );
        }
    }, []);

    useEffect(() => {
        if (graph) {
            graph?.fromJSON(data);
            document.addEventListener("keyup", keyUp);
        }

        return () => {
            document.removeEventListener("keyup", keyUp);
            graph?.dispose();
        };
    }, [graph]);

    return [container, graph];
}
