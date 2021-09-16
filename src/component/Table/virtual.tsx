import { Table, TableProps } from "antd";
import ResizeObserver from "rc-resize-observer";
import { VariableSizeGrid as Grid } from "react-window";
import React, { useEffect, useRef, useState } from "react";
import { CustomizeScrollBody } from "rc-table/lib/interface";

export function Virtual<RecordType extends object = any>(props: TableProps<RecordType>) {
    const { columns = [], scroll } = props;
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

    const renderVirtualList: CustomizeScrollBody<RecordType> = (rawData, { scrollbarSize, ref, onScroll }) => {
        //@ts-ignore
        ref.current = connectObject;
        const totalHeight = rawData.length * 41;

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
                rowHeight={() => 41}
                onScroll={({ scrollLeft }) => {
                    onScroll({ scrollLeft });
                }}
            >
                {({ columnIndex, rowIndex, style }) => (
                    <div style={style} className={"xc-virtual-table-cell"}>
                        {rawData[rowIndex][mergedColumns[columnIndex]["dataIndex"]]}{" "}
                    </div>
                )}
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
