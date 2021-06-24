import path from "path";
import express, { Router } from "express";
import Logger from "@swallowj/logjs";
import { GlobalConfig } from "../../typing/config";

const logger = Logger.New({ name: "config" });

export const ConfigApi = (args: GlobalConfig.ConfigApi) => args;

export const RouterApi = (args: GlobalConfig.RouterApi[]) => args;

export const loadFile = <T = any>({ filename, init }: GlobalConfig.loadFileProps<T>) => {
    const { NODE_ENV } = process.env;
    return [filename, `${filename}.local`, `${filename}.${NODE_ENV}`, `${filename}.${NODE_ENV}.local`]
        .map((f) => path.resolve(process.cwd(), "./config", f))
        .reduce<T>((o, f) => {
            try {
                logger.CommonLine(`加载文件 ${f}.js|ts`);
                o = { ...o, ...require(f).default };
                logger.SuccessLine(`文件 ${f}.js|ts 加载完成`);
            } finally {
                logger.FailedLine(`文件 ${f}.js|ts 不存在`);
                return o;
            }
        }, init);
};

export class MockApi {
    private __source: GlobalConfig.mockApiType[];
    private __prefix: string;
    private __router: Router;

    constructor(prefix = "") {
        this.__prefix = prefix;
        this.__source = [];
        this.__router = express.Router();
    }

    private __save(url: string, method: GlobalConfig.methods, handler: GlobalConfig.handlerFunc) {
        this.__source.push({ url: `${this.__prefix}${url}`, method, handler });
    }

    post(url: string, handler: GlobalConfig.handlerFunc) {
        // this.__save(url, "POST", handler);
        this.__router.post(url, handler);
    }

    get(url: string, handler: GlobalConfig.handlerFunc) {
        this.__save(url, "GET", handler);
    }

    put(url: string, handler: GlobalConfig.handlerFunc) {
        this.__save(url, "PUT", handler);
    }

    request(url: string, method: GlobalConfig.methods, handler: GlobalConfig.handlerFunc) {
        this.__save(url, method, handler);
    }

    delete(url: string, handler: GlobalConfig.handlerFunc) {
        this.__save(url, "DELETE", handler);
    }

    getSource() {
        return this.__source;
    }

    private __mergeSource(source: GlobalConfig.mockApiType[]) {
        source.forEach((s) => {
            this.__source.find((x) => x.url == s.url && x.method == s.method) || this.__source.push(s);
        });
    }

    use(...mocks: MockApi[]) {
        mocks.forEach((mock) => this.__mergeSource(mock.getSource()));
    }

    createServer() {
        const app = express();

        const router = express.Router();
        this.__source.forEach((src) => {
            // app.request();
            // router
        });

        app.use(express.json({ limit: "1mb" }));
    }
}
