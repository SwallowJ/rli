import { message } from "antd";
import { callType } from "@/utils/functools";
import security from "@/common/core/security";

export enum HTTPCode {
    OK = 200,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Timeout = 408,
    BadGateway = 502,
    GatewayTimeout = 504,
}

const parseError = (err: any) => {
    try {
        if (typeof err === "string") {
            parseError(JSON.parse(err));
        } else if (callType(err) === "[object Object]") {
            err.message && message.error(err.message);
        }
    } catch (_) {
        message.error(err);
    }
};

export const successHandler: REQUEST.responsehandler = async (reponse) => {
    try {
        security.updateToken(reponse);
        const result: Global.resultData = await reponse.json();

        if (callType(result) === "[object Object]" && !result.hasOwnProperty("code")) {
            return result;
        }

        if (result.code == 0) {
            return result.data;
        } else {
            parseError(result);
        }
    } catch (err) {
        parseError(err);
    }
};

export const errorHandler: REQUEST.responsehandler = async (res, req) => {
    const { status, url, statusText } = res;
    console.error(`${req.method} ${url || req.url} ${status} (${statusText})`);

    switch (status) {
        case HTTPCode.Timeout:
            message.error(`请求超时 (${req.method} ${url || req.url})`);
            break;

        case HTTPCode.Unauthorized:
            message.error(`未登录或登录已超时，请重新登录`);
            security.unauthorized();
            return;

        default:
            const result = await res.text();
            parseError(result);
            break;
    }

    return Promise.resolve();
};
