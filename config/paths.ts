/**
 * Author        jiangfh
 * Date          2021-04-30
 * email         feihongjiang@caih.com
 * Description   文件路径配置
 */
import fs from "fs";
import path from "path";

export const moduleFileExtensions = ["js", "ts", "tsx", "json", "jsx"];

const resolveApp = (relativePath: string) => path.resolve(process.cwd(), relativePath);

const resolveModule = (filePath: string) => {
    const extension = moduleFileExtensions.find((ex) => fs.existsSync(resolveApp(`${filePath}.${ex}`)));
    if (extension) {
        return resolveApp(`${filePath}.${extension}`);
    }
    return resolveApp(`${filePath}.js`);
};

export default {
    /**
     * 环境变量文件
     */
    dotenv: resolveApp(".env"),

    /**
     * build 输出目录
     */
    appBuild: resolveApp("build"),

    /**
     * web入口文件
     */
    appIndexJs: resolveModule("src/@boot/index"),

    /**
     * 静态文件
     */
    appPublic: resolveApp("public"),

    /**
     * web 目录
     */
    appSrc: resolveApp("src"),

    /**
     * ts 配置文件
     */
    appTsConfig: resolveApp("tsconfig.json"),
    /**
     * js 配置文件
     */
    appJsConfig: resolveApp("jsconfig.json"),
};
