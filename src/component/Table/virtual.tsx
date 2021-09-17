import { Table, TableProps } from "antd";
import ResizeObserver from "rc-resize-observer";
import { VariableSizeGrid as Grid } from "react-window";
import { CustomizeScrollBody } from "rc-table/lib/interface";
import React, { useEffect, useMemo, useRef, useState } from "react";

const __size = { small: 36, middle: 41, large: 46 };
const __layout = { center: "center", left: "flex-start", right: "flex-end" };

export function Virtual<RecordType extends object = any>(props: TableProps<RecordType>) {
    const { columns = [], scroll, size = "middle" } = props;
    const [tableWidth, setTableWidth] = useState(0);
    const widthColumnCount = columns.filter(({ width }) => !width).length;
    const mergedColumns = columns.map((column) => {
        if (column.width) {
            return column;
        }
        return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
    });

    const gridRef = useRef<Grid | null>(null);
    const [connectObject] = useState(() => {
        const obj = {};
        Object.defineProperty(obj, "scrollLeft", {
            get: () => null,
            set: (scrollLeft: number) => {
                if (gridRef.current) {
                    //@ts-ignore
                    gridRef.current.scrollTo({ scrollLeft });
                }
            },
        });
        return obj;
    });

    const resetVirtualGrid = () => {
        gridRef.current?.resetAfterIndices({
            rowIndex: 0,
            columnIndex: 0,
            shouldForceUpdate: true,
        });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const tableSize = useMemo(() => {
        return __size[size] || 41;
    }, [size]);

    const renderVirtualList: CustomizeScrollBody<RecordType> = (rawData, { scrollbarSize, ref, onScroll }) => {
        //@ts-ignore
        ref.current = connectObject;
        const totalHeight = rawData.length * tableSize;

        return (
            <Grid
                ref={gridRef}
                className={"xc-virtual-table"}
                columnCount={mergedColumns.length}
                columnWidth={(index) => {
                    const { width } = mergedColumns[index];
                    return totalHeight > Number(scroll?.y || 400) && index === mergedColumns.length - 1
                        ? Number(width) - scrollbarSize - 1
                        : Number(width);
                }}
                height={Number(scroll?.y) || 400}
                rowCount={rawData.length}
                width={tableWidth}
                rowHeight={() => tableSize}
                onScroll={({ scrollLeft }) => {
                    onScroll({ scrollLeft });
                }}
            >
                {({ columnIndex, rowIndex, style }) => {
                    const record = rawData[rowIndex];
                    const render = mergedColumns[columnIndex]["render"];
                    const value = record[mergedColumns[columnIndex]["dataIndex"]];

                    return (
                        <div
                            className={"xc-virtual-table-cell"}
                            style={{ ...style, justifyContent: __layout[columns[columnIndex].align ?? "left"] }}
                        >
                            {render ? render(value, record, columnIndex) : value}
                        </div>
                    );
                }}
            </Grid>
        );
    };

    return (
        <ResizeObserver
            onResize={({ width }) => {
                setTableWidth(width);
            }}
        >
            <Table {...props} columns={mergedColumns} pagination={false} components={{ body: renderVirtualList }} />
        </ResizeObserver>
    );
}
