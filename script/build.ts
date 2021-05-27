/**
 * Author        feihongjiang
 * Date          2021-05-25
 * email         feihongjiang@caih.com
 * Description   项目打包
 */

const ENV = "production";

process.env.NODE_ENV = ENV;
process.env.BABEL_ENV = ENV;

process.on("unhandledRejection", (err) => {
    throw err;
});

import fs from "fs";
import path from "path";
import webpack from "webpack";
import paths from "./utils/paths";
import Logger from "@swallowj/logjs";
import { loadEnvironment } from "./utils";
import { FormatUtils } from "./utils/format";
import WebPackConfig from "./utils/webpack.config";
import { loadRouter, loadModel } from "./utils/config";

Logger.setGlobalLevel(0);
const logger = Logger.New({ name: "build" });

async function compile() {
    fs.existsSync(paths.appBuild) && fs.rmSync(paths.appBuild, { recursive: true });
    fs.mkdirSync(paths.appBuild);

    /**
     * webpack配置
     */
    const configuration = WebPackConfig.createConfig();
    logger.Info("webpack 配置加载完成");
    const compiler = webpack(configuration);

    logger.Info("项目编译中...");
    const startTime = new Date();
    const result = await new Promise<webpack.Stats | undefined>((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                logger.Error(err);
                process.exit(1);
            }

            const message = stats?.toJson({ all: false, warnings: true, errors: true });
            if (message?.errors?.length) {
                message.errors.forEach((err) => logger.Error(err));
                process.exit(1);
            }

            if (message?.warnings?.length) {
                message.warnings.forEach((err) => logger.Warn(err));
            }

            resolve(stats);
        });
    });
    const endTime = new Date();

    Logger.clear();
    logger.Info("项目打包结束");

    if (result) {
        // const writeStream = fs.createWriteStream(path.resolve(process.cwd(), "script/build_result"));
        // writeStream.write(result.toString());
        // writeStream.close();
        const res = result.toJson();
        console.log(res.env);
        console.log(res.name);
        console.log(res.hash);
        console.log(res.version);
        console.log(res.time);
        // console.log(res.builtAt);
        // console.log(res.chunks);
        // console.log(res.assets);
        console.log(result.toString());
    }

    const duration = FormatUtils.durationTime(startTime, endTime);
    logger.log(`\x1B[41m编译时间: ${duration}\x1B[0m\n`);
}

async function build() {
    const startTime = new Date();
    Logger.clear();
    logger.Info("开始打包项目");

    loadEnvironment();
    loadRouter();
    loadModel();
    await compile();
    const endTime = new Date();
    const duration = FormatUtils.durationTime(startTime, endTime);

    logger.log(`\x1B[41m运行时间: ${duration}\x1B[0m\n`);
    console.log();
}

try {
    build();
    // console.log(`\x1B[41m编译时间: ${12}\x1B[0m`);
} catch (err) {
    logger.Error(err);
    process.exit(1);
}
