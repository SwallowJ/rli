import React, { useEffect, useRef, useState } from "react";
import styles from "./style.less";
import { useX6 } from "./hookx6";
import { data } from "./data";
import { GraphWorkbench } from "./component";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Addon } from "@antv/x6";

const { Dnd } = Addon;

const x6: React.FC = () => {
    const [ref, graph] = useX6(data);
    const [canRedo, setCanRedo] = useState(false);
    const [canUndo, setCanUndo] = useState(false);
    const dnd = useRef<Addon.Dnd>();

    const onRedo = () => {
        graph?.history.canRedo() && graph?.history.redo();
    };

    const onUndo = () => {
        graph?.history.canUndo() && graph?.history.undo();
    };

    const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.currentTarget;
        const type = target.getAttribute("data-type");

        if (type) {
            const node = graph?.createNode({
                shape: type,
                label: "新增节点-任务",
            });

            node && dnd.current?.start(node, e.nativeEvent);
        }
    };

    useEffect(() => {
        if (graph) {
            const history = graph.history;
            history.on("change", () => {
                setCanRedo(history.canRedo());
                setCanUndo(history.canUndo());
            });

            graph.bindKey("ctrl+z", onUndo);
            graph.bindKey("ctrl+y", onRedo);

            dnd.current = new Dnd({
                target: graph,
                animation: true,
                // validateNode(droppingNode, options) {
                //     return true;
                // },
            });

            // graph.createEdge()

            graph.on("edge:connected", ({ edge, isNew }) => {
                console.log(edge);
                console.log(isNew);
            });
        }
        return () => {
            graph?.history.off("change");
        };
    }, [graph]);

    return (
        <div className={styles.x6}>
            <div className={styles.shape}>
                <div className={styles.head}>
                    <Button icon={<ArrowLeftOutlined />} disabled={!canUndo} onClick={onUndo} />
                    <Button icon={<ArrowRightOutlined />} disabled={!canRedo} onClick={onRedo} />
                </div>
                <div className={styles.content}>
                    <div className={styles.baseRect} onMouseDown={startDrag} data-type={"base-rect-node"}>
                        {"节点-任务"}
                    </div>
                </div>
            </div>

            <div className={styles.graph} ref={ref} />

            <GraphWorkbench graph={graph} />
        </div>
    );
};

export default x6;
