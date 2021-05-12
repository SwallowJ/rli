import React from "react";
import styles from "./style.less";
import { useX6 } from "./hookx6";
import { data } from "./data";

const x6: React.FC = () => {
    const [ref, graph] = useX6(data);

    const addRect = () => {
        const ids = graph.current?.getNodes().map((r) => r.id);

        for (let i = 1; ; i++) {
            const id = `node${i}`;
            if (!ids?.includes(id)) {
                graph.current?.addNode({
                    shape: "base-Rect",
                    id: id,
                    x: 30 + i * 8,
                    y: 30 + i * 8,
                    width: 100,
                    height: 40,
                    label: `新增节点${i}`,
                    zIndex: 2,
                });
                return;
            }
        }
    };

    return (
        <div className={styles.x6}>
            <div className={styles.shape}>
                <div className={styles.rect} onClick={addRect}>
                    {"添加矩形"}
                </div>
            </div>

            <div className={styles.graph} ref={ref} />

            {/* <div className={styles.target}></div> */}
        </div>
    );
};

export default x6;
