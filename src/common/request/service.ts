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
};

export class ReqService extends RequestManagement {
    constructor(options: REQUEST.options = {}) {
        super({ ...initOptions, ...options });
    }

    protected get<T = any>(url: string, init?: REQUEST.reqInit, options?: REQUEST.reqOptions) {
        return this.request<T>("GET", url, init, options);
    }

    protected post<T = any>(url: string, init?: REQUEST.reqInit, options?: REQUEST.reqOptions) {
        return this.request<T>("POST", url, init, options);
    }

    protected put<T = any>(url: string, init?: REQUEST.reqInit, options?: REQUEST.reqOptions) {
        return this.request<T>("PUT", url, init, options);
    }

    protected delete<T = any>(url: string, init?: REQUEST.reqInit, options?: REQUEST.reqOptions) {
        return this.request<T>("DELETE", url, init, options);
    }
}

export default new ReqService();
