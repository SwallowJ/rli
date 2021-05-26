/**
 * Author        jiangfh
 * Date          2021-05-04
 * email         feihongjiang@caih.com
 * Description   webpack配置
 */

import config from "./config";
import { getLocalIdent } from "./cssLocalIdent";
import webpack, { Configuration } from "webpack";
import { GlobalConfig } from "../../typing/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import paths, { moduleFileExtensions } from "./paths";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const postcssNormalize = require("postcss-normalize");
const TerserPlugin = require("terser-webpack-plugin");

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
                filename: this.isEnvPro ? "static/js/[name].[contenthash:8].js" : "static/js/[name].bundle.js",
                chunkFilename: this.isEnvPro
                    ? "static/js/[name].[contenthash:8].chunk.js"
                    : "static/js/[name].bundle.js",

                publicPath: paths.publicPath,

                assetModuleFilename: "images/[hash][ext][query]",
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

                    new TerserPlugin(),
                ],

                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendors",
                            chunks: "all",
                        },
                    },
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
                rules: [
                    { parser: { requireEnsure: false } },
                    {
                        oneOf: [
                            {
                                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                                type: "asset/inline",
                            },

                            /**
                             * js| ts 解析
                             */
                            {
                                test: /\.(js|mjs|jsx|ts|tsx)$/,
                                loader: require.resolve("babel-loader"),
                                options: {
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                    compact: this.isEnvPro,
                                },
                            },

                            /**
                             * 解析css
                             */
                            {
                                test: /\.css$/,
                                exclude: /\.module\.css$/,
                                use: this._getStyleLoaders({ importLoaders: 1, sourceMap: this.isEnvPro }),
                                sideEffects: true,
                            },

                            /**
                             * 模块化解析css
                             */
                            {
                                test: /\.module\.css$/,
                                use: this._getStyleLoaders({
                                    importLoaders: 1,
                                    sourceMap: this.isEnvPro,
                                    modules: { getLocalIdent },
                                }),
                                sideEffects: true,
                            },

                            /**
                             * 解析less, 默认模块化
                             */
                            {
                                test: /\.less$/,
                                use: this._getStyleLoaders(
                                    {
                                        importLoaders: 1,
                                        sourceMap: this.isEnvPro,
                                        modules: { getLocalIdent },
                                    },
                                    "less-loader"
                                ),
                                sideEffects: true,
                            },

                            {
                                loader: require.resolve("file-loader"),
                                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                                options: {
                                    name: "static/media/[name].[hash:8].[ext]",
                                },
                            },
                        ],
                    },
                ],
            },

            plugins: [
                new HtmlWebpackPlugin({
                    inject: true,
                    template: paths.appHtml,
                    ...(this.isEnvPro
                        ? {
                              minify: {
                                  removeComments: true,
                                  collapseWhitespace: true,
                                  removeRedundantAttributes: true,
                                  useShortDoctype: true,
                                  removeEmptyAttributes: true,
                                  removeStyleLinkTypeAttributes: true,
                                  keepClosingSlash: true,
                                  minifyJS: true,
                                  minifyCSS: true,
                                  minifyURLs: true,
                              },
                          }
                        : {}),
                    favicon: paths.favicon,
                }),

                new webpack.DefinePlugin({
                    PRODUCTION: JSON.stringify(this.isEnvPro),
                    VERSION: JSON.stringify("5fa3b9"),
                    BROWSER_SUPPORTS_HTML5: true,
                    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                }),

                /**
                 * 热更新
                 */
                this.isEnvDev ? new webpack.HotModuleReplacementPlugin() : this.__emptyPlugin,

                this.isEnvPro
                    ? new MiniCssExtractPlugin({
                          filename: "static/css/[name].[contenthash:8].css",
                          chunkFilename: "static/css/[name].[contenthash:8].css",
                      })
                    : this.__emptyPlugin,

                new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),

                /**
                 * 在单独的进程上进行Typescript类型检查
                 * TODO 待添加es-lint 检查
                 */
                new ForkTsCheckerWebpackPlugin({
                    typescript: config.typescript,
                    async: this.isEnvDev,
                }),
            ],

            /**
             * TODO
             */
            performance: false,
        };
    }

    private static _getStyleLoaders(options: Object, preProcessor?: string) {
        const loaders: any = [
            this.isEnvDev && require.resolve("style-loader"),
            this.isEnvPro && {
                loader: MiniCssExtractPlugin.loader,
                options: paths.publicPath.startsWith(".") ? { publicPath: "../../" } : {},
            },
            {
                loader: require.resolve("css-loader"),
                options,
            },
            {
                loader: require.resolve("postcss-loader"),
                options: {
                    postcssOptions: {
                        plugins: [
                            require("postcss-flexbugs-fixes"),
                            require("postcss-preset-env")({
                                autoprefixer: {
                                    flexbox: "no-2009",
                                },
                                stage: 3,
                            }),
                            postcssNormalize(),
                        ],
                    },
                    sourceMap: this.isEnvPro,
                },
            },
        ].filter(Boolean);

        if (preProcessor) {
            loaders.push(
                {
                    loader: require.resolve("resolve-url-loader"),
                    options: {
                        sourceMap: this.isEnvPro,
                    },
                },
                {
                    loader: require.resolve(preProcessor),
                    options: {
                        sourceMap: true,
                    },
                }
            );
        }

        return loaders;
    }

    private static __emptyPlugin() {}
}

export default WebPackConfig;
