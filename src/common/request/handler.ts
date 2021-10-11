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
        } else if (callType(err) === "[object Error]") {
            message.error(err.message);
        }
    } catch (_) {
        message.error(err);
    }
};

export const successHandler: REQUEST.responsehandler = async (response, _, all) => {
    try {
        security.updateToken(response);
        const result: Global.resultData = await response.json();

        if (callType(result) === "[object Object]" && !result.hasOwnProperty("code")) {
            return result;
        }

        if (result.code == 0) {
            return all ? result : result.data || result.message || result;
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

export const fileSuccessHandler: REQUEST.responsehandler = async (response, req) => {
    const backup = response.clone();
    try {
        const result: Global.resultData = await response.json();
        parseError(result);
    } catch (_) {
        return downloadFile(backup);
    }
};

/**
 * 下载文件
 */
const downloadFile = async (response: Response) => {
    const headers = response.headers.get("content-disposition");
    let filename = "file";
    if (headers) {
        const math = headers.match(/filename=(.*);/);
        filename = math?.[1] ? decodeURI(math?.[1]) : filename;
    }

    const blob = await response.blob();
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(a.href);
    a.remove();
    return filename;
};
