/**
 * Author        jiangfh
 * Date          2021-05-04
 * email         feihongjiang@caih.com
 * Description   webpack配置
 */

import config from "./config";
import { Configuration } from "webpack";
import { GlobalConfig } from "../../typing/config";
import paths, { moduleFileExtensions } from "./paths";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

class WebPackConfig {
    private static isEnvPro: boolean;
    private static isEnvDev: boolean;
    private static NODE_ENV: GlobalConfig.NODE_ENV;

    /**
     * 获取webpack配置
     */
    static createConfig() {
        this.NODE_ENV = process.env.NODE_ENV as GlobalConfig.NODE_ENV;
        this.isEnvDev = this.NODE_ENV == "development";
        this.isEnvPro = this.NODE_ENV == "production";

        return this.config();
    }

    private static config(): Configuration {
        return {
            mode: this.NODE_ENV,
            bail: this.isEnvPro,
            devtool: config.sourcemap ?? (this.isEnvPro ? "source-map" : "cheap-module-source-map"),

            entry: [paths.appIndexJs],

            output: {
                path: paths.appBuild,
                pathinfo: this.isEnvDev,
                filename: this.isEnvPro ? "static/js/[name].[contenthash:8].js" : "static/js/bundle.js",
                chunkFilename: this.isEnvPro
                    ? "static/js/[name].[contenthash:8].chunk.js"
                    : "static/js/[name].bundle.js",

                publicPath: paths.publicPath,
            },

            /**
             * 优化
             */
            optimization: {
                minimize: this.isEnvPro,
                minimizer: [
                    new CssMinimizerPlugin({
                        minimizerOptions: {
                            preset: [
                                "default",
                                {
                                    discardComments: { removeAll: true },
                                },
                            ],
                        },
                    }),
                ],

                splitChunks: {
                    chunks: "all",
                    name: false,
                },

                runtimeChunk: {
                    name: (entrypoint: any) => `runtime-${entrypoint.name}`,
                },
            },

            /**
             * 解析
             */
            resolve: {
                modules: ["node_modules"],
                extensions: moduleFileExtensions,
                alias: { "@": paths.appSrc },
            },

            module: {
                strictExportPresence: false,
            },
        };
    }
}

export default WebPackConfig;
