/**
 * Author        jiangfh
 * Date          2021-05-10
 * email         feihongjiang@caih.com
 * Description   webpack编译
 */

import Logger from "@swallowj/logjs";
import webpack, { Configuration } from "webpack";
import forkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const logger = Logger.New({ name: "compiler" });

export const createCompiler = (config: Configuration) => {
    logger.Info("webpack开始编译...");
    const compiler = webpack(config);

    /**
     * 监听文件变化并重新编译bundle
     */
    compiler.hooks.invalid.tap("invalid", () => {
        Logger.clear();
        console.log("Compiling...");
    });

    /**
     * TODO 添加Typescript编译信息
     */
    forkTsCheckerWebpackPlugin.getCompilerHooks(compiler);

    /**
     * webpack编译结束事件(必须)
     * TODO 格式化错误信息
     */
    compiler.hooks.done.tap("done", async (stats) => {
        logger.Success("webpack编译完成");
        Logger.clear();

        const statsData = stats.toJson({
            all: false,
            warnings: true,
            errors: true,
        });

        if (statsData.errors?.length) {
            logger.Error("Failed to compile.");
            statsData.errors.forEach((err) => {
                logger.Error(err);
            });
            return;
        }

        if (statsData.warnings?.length) {
            logger.Warn("Compiled with warnings.");
            statsData.warnings.forEach((warn) => {
                logger.Warn(warn);
            });
        }
    });

    return compiler;
};
