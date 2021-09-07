export * from "./typing";
import styles from "./style.less";
import { Cell, Row } from "./component";
import { tableProps } from "./typing";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import React, { useCallback, useMemo, useRef } from "react";

const VirtualTable: React.FC<tableProps<any>> = (props) => {
    const {
        total,
        rowClass,
        rowRender,
        style = {},
        onRowClick,
        headHeight,
        renderEmpty,
        height = 400,
        columns = [],
        className = "",
        headClass = "",
        rowHeight = 35,
        dataSource = [],
        load = () => null,
    } = props;
    const timeRef = useRef<NodeJS.Timeout>();
    const RowFunc = useMemo(() => rowRender || Row, [rowRender]);
    const isItemLoaded = useCallback((index: number) => !!dataSource[index], [dataSource]);
    const loadMoreItems = useCallback(() => {
        if (!timeRef.current) {
            load && load();
            timeRef.current = setTimeout(() => {
                timeRef.current && clearTimeout(timeRef.current);
                timeRef.current = undefined;
            }, 500);
        }

        return null;
    }, [load]);

    return (
        <div className={`${styles.VirtualTable} ${className}`} style={{ height: `${height}px`, ...style }}>
            <div className={`${styles.Head} ${headClass}`} style={{ height: `${headHeight || rowHeight}px` }}>
                {columns.map((column) => (
                    <Cell column={column} key={column.dataIndex}>
                        {column.title}
                    </Cell>
                ))}
            </div>

            {dataSource.length ? (
                <InfiniteLoader
                    threshold={1}
                    isItemLoaded={isItemLoaded}
                    loadMoreItems={loadMoreItems}
                    itemCount={total || dataSource.length}
                >
                    {({ onItemsRendered, ref }) => (
                        <List
                            ref={ref}
                            height={359}
                            width={"100%"}
                            itemSize={rowHeight}
                            itemCount={dataSource.length}
                            onItemsRendered={onItemsRendered}
                        >
                            {({ index, style }) => (
                                <RowFunc
                                    index={index}
                                    style={style}
                                    columns={columns}
                                    className={rowClass}
                                    onClick={onRowClick}
                                    data={dataSource[index]}
                                />
                            )}
                        </List>
                    )}
                </InfiniteLoader>
            ) : (
                renderEmpty
            )}
        </div>
    );
};

export default VirtualTable;
