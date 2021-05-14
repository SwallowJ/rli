/**
 * Author        jiangfh
 * Date          2021-05-10
 * email         feihongjiang@caih.com
 * Description   webpack编译
 */

import Logger from "@swallowj/logjs";
import { FormatUtils } from "./format";
import webpack, { Configuration } from "webpack";
import forkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const logger = Logger.New({ name: "compiler" });

interface errMsg {
    errors: Array<any>;
    warnings: Array<any>;
}

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

    let tsMessagesPromise: null | Promise<errMsg> = null;
    let tsMessagesResolver: null | Function = null;

    compiler.hooks.beforeCompile.tap("beforeCompile", () => {
        tsMessagesPromise = new Promise((resolve) => {
            tsMessagesResolver = (msgs: errMsg) => {
                resolve(msgs);
            };
        });
    });

    /**
     * TODO 添加Typescript编译信息
     */
    const tsHooks = forkTsCheckerWebpackPlugin.getCompilerHooks(compiler);

    tsHooks.waiting.tap("afterTypeScriptCheck", (...args) => {
        const errors = args.map((x: any) => x.errors).reduce((a: any, b: any) => [...a, ...b], []);
        const warnings = args.map((x: any) => x.warnings).reduce((a: any, b: any) => [...a, ...b], []);

        tsMessagesResolver && tsMessagesResolver({ errors, warnings });
    });

    // tsHooks.waiting.

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

        if (!statsData.errors?.length && tsMessagesPromise) {
            const delayMsg = setTimeout(() => {
                process.stdout.write(`\x1b[33mFiles successfully emitted, waiting for typecheck results...\x1b[0m\n`);
            }, 100);

            new Promise(() => {
                setTimeout(() => {
                    tsMessagesResolver && tsMessagesResolver({ errors: [], warnings: [] });
                }, 3000);
            });

            const messages = await tsMessagesPromise;

            clearTimeout(delayMsg);

            statsData.warnings?.push(...messages.warnings);
            statsData.errors?.push(...messages.errors);
        }

        const message = FormatUtils.webpackMessages(statsData);

        if (message.errors?.length) {
            logger.Error("Failed to compile.");
            message.errors.forEach((err) => {
                logger.Error(err);
            });
            return;
        }
        if (message.warnings?.length) {
            logger.Warn("Compiled with warnings.");
            message.warnings.forEach((warn) => {
                logger.Warn(warn);
            });
            return;
        }

        FormatUtils.printInstructions();
    });

    return compiler;
};
