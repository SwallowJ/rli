/**
 * Author        jiangfh
 * Date          2021-05-10
 * email         feihongjiang@caih.com
 * Description   格式化输出工具
 */

import dayjs from "dayjs";
import config from "./config";
import Logger from "@swallowj/logjs";
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

        const res = stats.toJson();
        console.log(res.env);
        console.log(res.name);
        console.log(res.hash);
        console.log(res.version);
        console.log(res.time);

        const result: GlobalConfig.resultProps = {
            runTime,
            compileTime: res.time,
        };

        console.log("=========================");
        console.log(result);
        console.log();
    }
}
