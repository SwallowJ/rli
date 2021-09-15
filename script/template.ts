/**
 * Author        feihongjiang
 * Date          2021-09-15
 * email         feihongjiang@caih.com
 * Description   目录模板生成
 */
const ENV = "development";

process.env.NODE_ENV = ENV;
process.env.BABEL_ENV = ENV;

process.on("unhandledRejection", (err) => {
    throw err;
});

import fs from "fs";
import path from "path";
import paths from "./utils/paths";
import Logger from "@swallowj/logjs";
import { actions, model, service, typing } from "./utils/template";

Logger.setGlobalLevel(0);
const logger = Logger.New({ name: "template" });

type handFunc = (writeStream: fs.WriteStream, name: string) => void;

/**
 * 获取校验命令行参数
 */
const getArgvFile = () => {
    const { argv } = process;
    const _target = "-f";

    let p = "";
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (argv[i] === _target && argv[i + 1]) {
            p = argv[i + 1];
            break;
        }
    }
    if (!p) {
        return;
    }
    const dir = path.resolve(paths.appSrc, p);
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
        logger.Error(`目录[${dir}]不存在或者`);
        process.exit(9);
    }

    return dir;
};

const tempWrap = async (dir: string, name: string, fn: handFunc) => {
    const filepath = path.resolve(dir, name);

    if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
        logger.Warn(`文件[${filepath}]已存在`);
        return;
    }
    let writeStream: fs.WriteStream | null = null;

    try {
        writeStream = fs.createWriteStream(filepath);
        const proName = path.basename(dir);
        fn(writeStream, `${proName[0].toUpperCase()}${proName.slice(1)}`);
    } catch (err) {
        logger.Error(err);
    } finally {
        writeStream?.close();
        writeStream?.end();
        logger.Debug(`文件[${filepath}]处理完成`);
    }
};

/**
 * 初始化模板
 */
const initTemplate = async (filepath: string) => {
    Promise.all([
        tempWrap(filepath, "actions.ts", actions),
        tempWrap(filepath, "model.ts", model),
        tempWrap(filepath, "service.ts", service),
        tempWrap(filepath, "typing.d.ts", typing),
    ]).then(() => {
        logger.Info(`模板[${filepath}]处理完成`);
    });
};

try {
    const argsFile = getArgvFile();
    if (argsFile) {
        initTemplate(argsFile);
    }
} catch (err) {
    logger.Error(err);
    process.exit(1);
}
