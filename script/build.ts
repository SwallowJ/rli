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

    const Stats = await new Promise<webpack.Stats | undefined>((resolve, reject) => {
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

    Logger.clear();
    logger.Success("项目打包完成");
    return Stats;
}

async function build() {
    const startTime = new Date();
    Logger.clear();
    logger.Info("开始打包项目");

    loadEnvironment();
    loadRouter();
    loadModel();

    const stats = await compile();
    const endTime = new Date();
    const runTime = endTime.getTime() - startTime.getTime();
    FormatUtils.analysis(runTime, stats);
    console.log();
}

try {
    build();
} catch (err) {
    logger.Error(err);
    process.exit(1);
}
