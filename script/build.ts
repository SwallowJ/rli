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
import { loadModel } from "./utils/config";
import { loadRouter } from "./utils/router";
import { FormatUtils } from "./utils/format";
import WebPackConfig from "./utils/webpack.config";

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

    loadRouter();
    loadModel();

    const stats = await compile();
    copyPublicFolder();
    const endTime = new Date();
    const runTime = endTime.getTime() - startTime.getTime();
    FormatUtils.analysis(runTime, stats);
}

/**
 * 拷贝%PUBLIC%目录下的文件到打包目录
 */
const copyPublicFolder = () => {
    const __exclude = ["favicon.ico", "index.html"];
    const __srcDir = paths.appPublic;
    const __destDir = paths.appBuild;

    fs.existsSync(__destDir) || fs.mkdirSync(__destDir);
    fs.readdirSync(__srcDir).forEach((f) => {
        __exclude.includes(f) || copy(path.resolve(__srcDir, f), path.resolve(__destDir, f));
    });
};

const copy = (src: string, dest: string) => {
    if (!fs.existsSync(src)) {
        return;
    }

    /**
     * 如果是文件则直接拷贝
     */
    if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
        return;
    }

    /**
     * 递归拷贝目录
     */
    fs.existsSync(dest) || fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((f) => {
        copy(path.resolve(src, f), path.resolve(dest, f));
    });
};

try {
    build();
} catch (err) {
    logger.Error(err);
    process.exit(1);
}
