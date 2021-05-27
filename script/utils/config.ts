/**
 * Author        jiangfh
 * Date          2021-05-20
 * email         feihongjiang@caih.com
 * Description   配置解析
 */

import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import crypto from "crypto";
import address from "address";
import { loadFile } from "./tools";
import Logger from "@swallowj/logjs";
import { GlobalConfig } from "../../typing/config";

const logger = Logger.New({ name: "config" });

const __Reg_Model = /(namespace:)(\S|\s)*(state:)(\S|\s)*(effects:)(\S|\s)*(reducers:)(\S|\s)*(export default).*/;

const __Src_Path = path.resolve(process.cwd(), "src");
const __Temp_Path = path.resolve(process.cwd(), "src/@temp");

const __checkEnv = () => {
    const { NODE_ENV } = process.env;

    if (!NODE_ENV) {
        throw new Error("缺少环境变量 NODE_ENV");
    }
};

const resolveConfig = (function () {
    try {
        __checkEnv();
        logger.Info("开始加载配置");
        const init: GlobalConfig.ConfigApi = {
            typescript: true,
            disableHostCheck: false,
            sockHost: address.ip(),
            sockPath: "/sockjs-node",
            host: address.ip(),
            appName: require(path.resolve(process.cwd(), "package.json")).name,
        };

        const res = loadFile({ filename: "config", init });

        logger.lineOver();
        logger.Success("配置加载完成");
        return res;
    } catch (err) {
        logger.Error(err);
        process.exit(1);
    }
})();

/**
 * 零时文件目
 */
const tempPath = (function () {
    if (fs.existsSync(__Temp_Path)) {
        if (fs.statSync(__Temp_Path).isFile()) {
            fs.unlinkSync(__Temp_Path);
            fs.mkdirSync(__Temp_Path);
        }
    } else {
        fs.mkdirSync(__Temp_Path);
    }
    return __Temp_Path;
})();

const resolvePath = (...args: string[]) => args.reduce((a, p) => (p.startsWith(a) ? p : a + p), "");

/**
 *路由加载
 */
export const loadRouter = () => {
    let writeStream: fs.WriteStream | null = null;
    try {
        __checkEnv();
        const { NODE_ENV } = process.env;
        const filename = "router";

        const config = [`${filename}.${NODE_ENV}.local`, `${filename}.${NODE_ENV}`, `${filename}.local`, filename]
            .map((f) => path.resolve(process.cwd(), "./config", f))
            .find((f) => {
                try {
                    return Boolean(require(f).default);
                } catch (err) {
                    return false;
                }
            });

        if (!config) {
            logger.Warn("未找到配置文件");
            return;
        }

        const routers = require(config).default as GlobalConfig.RouterApi[];

        writeStream = fs.createWriteStream(path.resolve(tempPath, "router.tsx"));

        writeStream.write(
            `/**\n * Author        feihongjiang\n * Date          ${dayjs().format(
                "YYYY-MM-DD HH:mm:ss.SSS"
            )}\n * email         feihongjiang@caih.com\n * Description   路由配置\n */\n\n`
        );

        writeStream.write(`import React from "react";\n`);
        writeStream.write(`import loadable from "@loadable/component";\n`);
        writeStream.write(`import Loading from "@/pages/Common/loading";\n\n`);
        writeStream.write(`const options = {\n\tfallback: <Loading />,\n};\n\n`);
        writeStream.write(`const routers: Aplication.router[] = [\n`);

        const parseData = (data: GlobalConfig.dataType, t: number) => {
            const t1 = new Array(t).fill("\t").join("");
            const t2 = new Array(t + 1).fill("\t").join("");

            switch (Object.prototype.toString.call(data)) {
                case "[object String]":
                    writeStream?.write(`"${data}",`);
                    return;
                case "[object Object]":
                    writeStream?.write(`{\n`);
                    Object.entries(data).forEach(([key, value]) => {
                        writeStream?.write(`${t2}${key}: `);
                        parseData(value, t + 2);
                    });
                    writeStream?.write(`\n${t1}},`);
                    return;
                case "[object Array]":
                    writeStream?.write(`[`);
                    (data as Array<GlobalConfig.dataType>).forEach((d) => {
                        parseData(d, t + 2);
                    });
                    writeStream?.write(`],`);
                    return;

                default:
                    writeStream?.write(`${data},`);
                    return;
            }
        };

        const parseRouter = (routers: GlobalConfig.RouterApi[], t = 1, rootPath = "/") => {
            const t1 = new Array(t).fill("\t").join("");
            const t2 = new Array(t + 1).fill("\t").join("");

            routers.forEach((router) => {
                const currentPath = resolvePath(rootPath, router.path);
                writeStream?.write(`${t1}{\n`);

                Object.entries(router).forEach(([key, value]) => {
                    switch (key) {
                        case "routers":
                            writeStream?.write(`${t2}${key}: [\n`);
                            parseRouter(value, t + 2, currentPath);
                            writeStream?.write(`${t2}],\n`);
                            return;

                        case "component":
                            writeStream?.write(`${t2}${key}: loadable(() => import("${value}"), options),\n`);
                            return;
                        case "data":
                            writeStream?.write(`${t2}${key}: `);
                            parseData(value, t + 1);
                            writeStream?.write("\n");
                            return;
                        case "path":
                            writeStream?.write(`${t2}${key}: "${currentPath}",\n`);
                            return;
                        default:
                            writeStream?.write(`${t2}${key}: "${value}",\n`);
                            return;
                    }
                });

                writeStream?.write(`${t1}},\n`);
            });
        };

        parseRouter(routers);

        writeStream.write(`];\n\nexport default routers;\n`);
    } catch (err) {
        logger.Error(err);
        process.exit(1);
    } finally {
        writeStream?.close();
    }
};

const __scanModels = (dir: string, writeStream: fs.WriteStream, isModel: boolean) => {
    fs.readdirSync(dir).forEach((f) => {
        const p = path.resolve(dir, f);

        if (fs.statSync(p).isFile()) {
            if (!/.[t|j]sx?$/.test(path.extname(p))) {
                return;
            }

            logger.CommonLine(`扫描目录 ${path.relative(__Src_Path, p)}`);

            const name = f.substring(0, f.lastIndexOf("."));

            if (isModel && name != "model") {
                logger.lineOver();
                return;
            }

            const content = fs.readFileSync(p, { encoding: "utf8" });

            if (__Reg_Model.test(content)) {
                const hash8 = crypto.createHash("sha256").update(content).copy().digest("hex").slice(0, 8);
                writeStream.write(`export * as ${name}_${hash8} from "${path.resolve(dir, name)}";\n`);
                logger.SuccessLine(`文件 ${path.relative(__Src_Path, p)} 加载完成`);
            }
        } else {
            __scanModels(p, writeStream, isModel);
        }
    });
};

/**
 * 加载model
 * 集成redux
 */
export const loadModel = () => {
    let writeStream: fs.WriteStream | null = null;
    try {
        writeStream = fs.createWriteStream(path.resolve(tempPath, "models.ts"));

        const __Model_Path = path.resolve(__Src_Path, "models");
        const __Page_Path = path.resolve(__Src_Path, "pages");

        fs.existsSync(__Model_Path) &&
            fs.statSync(__Model_Path).isDirectory() &&
            __scanModels(__Model_Path, writeStream, false);

        fs.existsSync(__Page_Path) &&
            fs.statSync(__Page_Path).isDirectory() &&
            __scanModels(__Page_Path, writeStream, true);
    } catch (err) {
        logger.Error(err);
        process.exit(1);
    } finally {
        writeStream?.close();
    }
};

export default resolveConfig;
