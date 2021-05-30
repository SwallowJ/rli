import Logger from "@swallowj/logjs";
import { GlobalConfig } from "../../typing/config";

const logger = Logger.New({ name: "build" });

class Table {
    private __BASE_COLOR: string;
    private __BASE_WIDTH: number;

    constructor(params?: GlobalConfig.tableProps) {
        this.__BASE_COLOR = params?.color || "\x1B[32m";
        this.__BASE_WIDTH = params?.width || 80;
    }

    len(str: string) {
        return str.split("").reduce((a, b) => (a += 1 + Number(b.charCodeAt(0) > 127 || b.charCodeAt(0) == 94)), 0);
    }

    printRow(str: string) {
        logger.log(`|${this.fixedWidth(str)}|\n${this.setChar("—")}\n`);
    }

    setChar(char: string, num: number = this.__BASE_WIDTH) {
        return num > 0 ? new Array(num).fill(char).join("") : "";
    }

    fixedWidth(str: string, width = this.__BASE_WIDTH - 2) {
        const strW = this.len(str.replace(/\x1B\[\d+m/g, ""));
        if (strW > width) {
            return str.slice(0, width);
        }
        return str + this.setChar(" ", width - strW);
    }

    backTab(num: number) {
        return this.setChar("\b", num * 4);
    }

    cell(key: string, value: string | number = "-", num: number = (this.__BASE_WIDTH - 2) / 2 - 2) {
        return this.fixedWidth(`${key}\x1B[36m${value}\x1B[39m${this.__BASE_COLOR}`, num);
    }

    printTitle(str: string, prefix = "\n\n") {
        logger.log(`${prefix}${this.__BASE_COLOR}${this.setChar("=")}
        ${this.backTab(3)}|\x1B[1m${this.fixedWidth(str)}\x1B[22m|
        ${this.backTab(3)}${this.setChar("—")}\n`);
    }

    renderTable(columns: GlobalConfig.ResulColumns[], dataSource: GlobalConfig.code[]) {
        const title = columns.map((c) => ` ${this.fixedWidth(c.title, c.width)}`).join(" |");
        this.printRow(title);
        dataSource.forEach((data) => {
            const row = columns
                .map(
                    (c) =>
                        ` \x1B[36m${this.fixedWidth(
                            String(c.render ? c.render(data[c.dataIndex]) : data[c.dataIndex]),
                            c.width
                        )}\x1B[39m${this.__BASE_COLOR}`
                )
                .join(" |");
            this.printRow(row);
        });
    }
}

export default Table;
