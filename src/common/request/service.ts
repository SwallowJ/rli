import { RequestManagement } from "./request";

/**
 * 初始配置
 */
const initOptions: REQUEST.options = {
    credentials: "include",
    keepalive: true,
};

export class ReqService extends RequestManagement {
    prefix: string;

    constructor(prefix?: string) {
        super({ ...initOptions });
        this.prefix = prefix || "";
    }

    private exec(method: REQUEST.MethodType, url: string, init?: REQUEST.reqInit) {
        return this.request(method, `${this.prefix}${url}`, init);
    }

    protected get(url: string, init?: REQUEST.reqInit) {
        return this.exec("GET", url, init);
    }

    protected post(url: string, init?: REQUEST.reqInit) {
        return this.exec("POST", url, init);
    }

    protected put(url: string, init?: REQUEST.reqInit) {
        return this.exec("PUT", url, init);
    }

    protected delete(url: string, init?: REQUEST.reqInit) {
        return this.exec("DELETE", url, init);
    }
}

export default new ReqService();
