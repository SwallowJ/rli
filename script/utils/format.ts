/**
 * Author        jiangfh
 * Date          2021-05-10
 * email         feihongjiang@caih.com
 * Description   格式化输出工具
 */
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import Table from "./table";
import paths from "./paths";
import config from "./config";
import Logger from "@swallowj/logjs";
import { execSync } from "child_process";
import { GlobalConfig } from "../../typing/config";
import webpack, { StatsCompilation } from "webpack";

export class FormatUtils {
    static logger = Logger.New({ name: "compiler" });

    static webpackMessages(json: StatsCompilation) {
        const errors = json.errors?.map((msg) => msg);
        const warnings = json.warnings?.map((msg) => msg);
        const isSuccessful = !errors?.length && !warnings?.length;
        return { errors, warnings, isSuccessful };
    }

    static printInstructions() {
        Logger.clear();
        this.logger.Success("Compiled successfully!");
        console.log(`\n You can view \x1b[4m\x1b[1m${config.appName}\x1b[0m in the browser.\n`);

        console.log(`  \x1b[1mLocak:\x1b[0m    http://localhost:${config.port}`);
        console.log(`  \x1b[1mNetwork:\x1b[0m  http://${config.host}:${config.port}\n`);

        console.log(`Development build is not optimized.`);
        console.log(`\x1B[3m\x1B[90m${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}\x1B[0m`);
    }

    static durationTime(startTime: Date, endTime: Date) {
        const str = String(endTime.getTime() - startTime.getTime());
        return `${str.slice(0, -3)}.${str.slice(-3)}s`;
    }

    static analysis(runTime: number, stats?: webpack.Stats) {
        if (!stats) {
            return;
        }

        const __BASE_COLOR = "\x1B[32m";
        const __BASE_WIDTH = 80;
        const __SIGLE_CELL = __BASE_WIDTH - 6;

        const __NAME = 54;
        const __SIZE = 8;
        const __PERCENT = 8;

        const size = parseInt(execSync(`du -s -b ${paths.appBuild}`).toString("utf8").trim());

        const res = stats.toJson();
        const assets = res.assets?.reduce<GlobalConfig.asserGroup>((o, assert) => {
            const target = /static\/(\w*)\//.exec(assert.name);
            const type = target ? target[1] : "others";

            o[type] = o[type] || [];
            o[type].push({
                name: assert.name,
                size: assert.size,
                percent: `${((assert.size / size) * 100).toFixed(2)}%`,
            });

            return o;
        }, {});

        const result: GlobalConfig.resultProps = {
            runTime,
            time: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS"),
            compileTime: res.time,
            hash: res.hash,
            ...config,
            size,
            assets,
        };

        const analysisPath = path.relative(process.cwd(), "log/analysis");
        fs.existsSync(analysisPath) || fs.mkdirSync(analysisPath);

        const writeStream = fs.createWriteStream(
            path.resolve(analysisPath, `${dayjs().format("YYYY_MM_DD")}_${res.hash?.slice(0, 6) || ""}.json`)
        );
        writeStream.write(JSON.stringify(result, null, "\t"));
        writeStream.close();

        const parseSize = (num: number, warn = 2 ** 20, alert = 2 ** 20 * 5) => {
            let prefix = "";
            if (num >= warn) {
                prefix = "\x1B[33m";
            } else if (num > alert) {
                prefix = "\x1B[31m";
            }
            return `${prefix}${(num / 1024).toFixed(2)}KB${__BASE_COLOR}`;
        };
        const parseTime = (num: number = 0, warn = 50, alert = 100) => {
            let prefix = "";
            if (num >= warn * 1000) {
                prefix = "\x1B[33m";
            } else if (num > alert * 1000) {
                prefix = "\x1B[31m";
            }
            return `${prefix}${(num / 1000).toFixed(3)}s${__BASE_COLOR}`;
        };

        const logger = Logger.New({ name: "build" });

        const table = new Table({ width: __BASE_WIDTH, color: __BASE_COLOR });

        table.printTitle(" 基本信息");
        table.printRow(` ${table.cell("项目名称 ", result.appName)} |${table.cell(" 主机名    ", result.hostname)} `);
        table.printRow(` ${table.cell("node版本 ", result.nodeVer)} |${table.cell(" react版本 ", result.reactVer)} `);
        table.printRow(
            ` ${table.cell("webpack  ", result.webpackVer)} |${table.cell(" 系统       ", result.platform)} `
        );
        table.printRow(` ${table.cell("作者     ", result.author)} |${table.cell(" 邮箱      ", result.email)} `);
        table.printRow(` ${table.cell("仓库     ", result.repository, __SIGLE_CELL)} `);

        table.printTitle(" 打包信息");
        table.printRow(
            ` ${table.cell("运行时间 ", parseTime(result.runTime))} |${table.cell(
                " 打包时间 ",
                parseTime(result.compileTime)
            )} `
        );
        table.printRow(
            ` ${table.cell("时间     ", result.time)} |${table.cell(" 大小     ", parseSize(result.size))} `
        );
        table.printRow(` ${table.cell("Git分支  ", result.branch)} |${table.cell(" Git版本  ", result.gitVer)} `);
        table.printRow(` ${table.cell("hash值   ", result.hash, __SIGLE_CELL)}`);
        table.printRow(` ${table.cell("入口文件  ", paths.appIndexJs, __SIGLE_CELL)} `);

        const columns: GlobalConfig.ResulColumns[] = [
            { title: "文件名称", width: __NAME, dataIndex: "name" },
            {
                title: "大小",
                width: __SIZE,
                dataIndex: "size",
                render: parseSize,
            },
            { title: "百分比", width: __PERCENT, dataIndex: "percent" },
        ];
        logger.log(`\n打包结果:\n`);
        Object.entries(result.assets || {}).map(([type, value]) => {
            table.printTitle(` ${type}`, "\n");
            table.renderTable(columns, value);
        });
    }
}
