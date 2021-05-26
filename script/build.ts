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
import { loadRouter, loadModel } from "./utils/config";
import { HostUtils, loadEnvironment, createCompiler, DevserverConfig } from "./utils";
import WebPackConfig from "./utils/webpack.config";

Logger.setGlobalLevel(0);
const logger = Logger.New({ name: "start" });
// interface KnownStatsCompilation {
//     env?: any;
//     name?: string;
//     hash?: string;
//     version?: string;
//     time?: number;
//     builtAt?: number;
//     needAdditionalPass?: boolean;
//     publicPath?: string;
//     outputPath?: string;
//     assetsByChunkName?: Record<string, string[]>;
//     assets?: StatsAsset[];
//     filteredAssets?: number;
//     chunks?: StatsChunk[];
//     modules?: StatsModule[];
//     filteredModules?: number;
//     entrypoints?: Record<string, StatsChunkGroup>;
//     namedChunkGroups?: Record<string, StatsChunkGroup>;
//     errors?: StatsError[];
//     errorsCount?: number;
//     warnings?: StatsError[];
//     warningsCount?: number;
//     children?: StatsCompilation[];
//     logging?: Record<string, StatsLogging>;
// }
async function build() {
    logger.Info("项目打包中...");

    fs.existsSync(paths.appBuild) && fs.rmSync(paths.appBuild, { recursive: true });
    fs.mkdirSync(paths.appBuild);

    /**
     * webpack配置
     */
    const configuration = WebPackConfig.createConfig();
    logger.Info("webpack 配置加载完成");
    const compiler = webpack(configuration);

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

    // console.log(result);
    if (result) {
        // const writeStream = fs.createWriteStream(path.resolve(process.cwd(), "script/build_result"));
        // writeStream.write(result.toString());
        // writeStream.close();

        // const res = result.toJson();
        // console.log(res.env);
        // console.log(res.name);
        // console.log(res.hash);
        // console.log(res.version);
        // console.log(res.time);
        // console.log(res.builtAt);
        // console.log(res.chunks);
        // console.log(res.assets);
    }
}

try {
    loadEnvironment();
    loadRouter();
    loadModel();
    build();
} catch (err) {
    logger.Error(err);
    process.exit(1);
}
