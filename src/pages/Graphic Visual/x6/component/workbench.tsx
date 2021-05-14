import styles from "./style.less";
import { Graph, Cell, Model } from "@antv/x6";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "antd";

interface workbenchProps {
    graph: Graph | undefined;
}

const workbench: React.FC<workbenchProps> = ({ graph }) => {
    const [target, setTarget] = useState<Cell>();

    /**
     * 复制图元
     */
    const copyCell = () => {
        if (target) {
            graph?.copy([target]);
            const obj = graph?.paste({ offset: 30 });

            graph?.cleanSelection();
            obj && graph?.select(obj);
        }
    };

    /**
     * 删除图元
     */
    const delCell = () => {
        if (target) {
            graph?.removeCell(target);
            // setTarget(undefined);
        }
    };

    useEffect(() => {
        if (graph) {
            graph.on("cell:selected", ({ cell }) => {
                setTarget(cell);
            });

            graph.on("cell:unselected", () => {
                setTarget(undefined);
            });

            graph.bindKey("ctrl+c", () => {
                const cells = graph.getSelectedCells();
                cells.length && graph.copy(cells);
            });

            graph.bindKey("ctrl+v", () => {
                if (!graph.isClipboardEmpty()) {
                    const cells = graph.paste({ offset: 30 });

                    graph.cleanSelection();
                    graph.select(cells);
                }
            });

            graph.bindKey("delete", () => {
                const cells = graph.getSelectedCells();
                cells.length && graph.removeCells(cells);
            });
        }

        return () => {
            graph?.off("cell:selected");
            graph?.off("cell:unselected");
            graph?.unbindKey("ctrl+c");
            graph?.unbindKey("ctrl+v");
        };
    }, [graph]);

    const { data, attrs, type } = useMemo(() => {
        if (!target) {
            return { data: {}, attrs: {}, type: "" };
        }
        const data = target.toJSON();
        return { data, attrs: target?.getAttrs(), type: data.shape?.endsWith("node") ? "节点" : "边" };
    }, [target]);

    // useEffect(() => {
    //     console.log(data, attrs);
    // }, [data]);

    return (
        <div className={styles.workbench}>
            <div className={styles.head}>
                {target ? (
                    <>
                        <label>{data?.shape}</label>
                        <span>{attrs?.text?.text || data?.labels?.[0]?.attrs?.label?.text}</span>
                    </>
                ) : (
                    <span>{"未选择任何节点"}</span>
                )}
            </div>
            <div className={styles.content}></div>

            <div className={styles.footer}>
                <Button danger={true} disabled={!target} onClick={delCell}>{`删除${type}`}</Button>
                <Button type={"primary"} disabled={!target} onClick={copyCell}>{`复制${type}`}</Button>
            </div>
        </div>
    );
};

export const GraphWorkbench = workbench;
