/**
 * Author        jfh
 * Date          2021-08-17
 * email         feihongjiang@caih.com
 * Description   代理配置
 */

import { ProxyConfigMap } from "webpack-dev-server";

const proxyMap = new Map<string | number, ProxyConfigMap>([
    [
        //本地虚拟机服务器
        "virtual",
        {
            "/api/v1": {
                target: "http://172.17.144.2:6001",
                changeOrigin: true,
            },
        },
    ],
]);

export const createProxy = () => {
    const { PROXY = "" } = process.env;
    return proxyMap.get(PROXY) || {};
};
