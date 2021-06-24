import fs from "fs";
import path from "path";
import paths from "./paths";
import { MockApi } from "./tools";
import Logger from "@swallowj/logjs";
import express, { Express } from "express";
import { GlobalConfig } from "typing/config";

const logger = Logger.New({ name: "mock" });

const load = (mock: MockApi, dir: string) => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((f) => {
            const p = path.resolve(dir, f);

            if (fs.statSync(p).isFile()) {
                try {
                    const instance = require(p).default as MockApi;
                    mock.use(instance);
                } catch (err) {
                    logger.Error(err);
                }
            } else {
                load(mock, p);
            }
        });
    }
};

export const loadMock = (): Express => {
    try {
        // const routers = MockApi();
        const mock = new MockApi();
        load(mock, paths.mockPath);

        const app = express();
        // const router
        console.log(mock);

        return app;
    } catch (err) {
        logger.Error(err);
        return express();
    }
};
