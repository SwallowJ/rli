import { message } from "antd";
import security from "@/common/core/security";
import { RequestManagement } from "./request";
import { successHandler, errorHandler } from "./handler";

/**
 * 初始配置
 */
const initOptions: REQUEST.options = {
    timeout: 20000,
    keepalive: true,
    credentials: "include",
    errorHandler: errorHandler,
    successHandler: successHandler,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
};

export class ReqService extends RequestManagement {
    /**
     * 消息反馈
     */
    message = message;

    constructor(options: REQUEST.options = {}) {
        super({ ...initOptions, ...options });
    }

    extends<T>(method: REQUEST.MethodType, url: string, init: REQUEST.reqInit = {}, options?: REQUEST.reqOptions) {
        return this.request<T>(
            method,
            url,
            { ...init, headers: { TOKEN: security.getToken(), ...init.headers } },
            options
        );
    }

    get<T = any>(url: string, init?: REQUEST.reqInit, options?: REQUEST.reqOptions) {
        return this.extends<T>("GET", url, init, options);
    }

    post<T = any>(url: string, init?: REQUEST.reqInit, options?: REQUEST.reqOptions) {
        return this.extends<T>("POST", url, init, options);
    }

    put<T = any>(url: string, init?: REQUEST.reqInit, options?: REQUEST.reqOptions) {
        return this.extends<T>("PUT", url, init, options);
    }

    delete<T = any>(url: string, init?: REQUEST.reqInit, options?: REQUEST.reqOptions) {
        return this.extends<T>("DELETE", url, init, options);
    }
}

export default new ReqService();
