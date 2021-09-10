import fs from "fs";
import path from "path";
import paths from "./paths";
import remark from "./remark";
import Logger from "@swallowj/logjs";
import { GlobalConfig } from "typing/config";
import { __checkEnv, createWriteStream } from "./config";

const logger = Logger.New({ name: "config" });

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

        writeStream = createWriteStream(paths.tempPath, "router.tsx");

        remark.mark(writeStream, { auth: "jfh", email: "feihongjiang@caih.com", desc: "路由配置" });
        writeStream.write(`import React from "react";\n`);
        writeStream.write(`import loadable from "@loadable/component";\n`);
        writeStream.write(`import Loading from "@/common/view/loading";\n\n`);
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
