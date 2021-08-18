/**
 * Author     feihongjiang
 * Date       2021-08-17
 * email      feihongjiang@caih.com
 * Desc       fetch请求封装
 */
import { callType } from "@/utils/functools";

export class RequestManagement {
    private options: REQUEST.options;

    /**
     * 请求结束中间件
     */
    private successHandler: REQUEST.successHandler[];

    private errorHandler: REQUEST.errorHandler[];

    /**
     * 客户端
     */
    private client: REQUEST.Client;

    constructor(options: REQUEST.options = {}) {
        this.successHandler = options.successHandler || [];
        this.errorHandler = options.errorHandler || [];

        const opt = Object.assign({}, options);
        delete opt.successHandler;
        delete opt.errorHandler;

        this.options = opt;
        this.client = this.createClient();
    }

    /**
     * 发起请求(fetch)
     */
    protected async request(method: REQUEST.MethodType, url: string, init: REQUEST.reqInit = {}) {
        const req = this.resolveOptions(method, url, init);
        const response = await this.client(req);
        console.log(response);

        const headers = response.headers.entries();
        console.log("headers: ", headers);
    }

    /**
     * 解析客户端参数
     */
    private resolveOptions(method: REQUEST.MethodType, url: string, init: REQUEST.reqInit): REQUEST.ReqType {
        const options = this.options;
        const __URL = this.resolveUrl(url, init.params);

        return {
            ...this.options,
            ...init,
            method,
            url: `${options.prefix || ""}${__URL}`,
            body: this.resolveBody(method, init.data),
            headers: { ...options.headers, ...init.headers },
        };
    }

    /**
     * 解析body
     */
    private resolveBody(method: REQUEST.MethodType, data?: BodyInit | any) {
        const mt = method.toUpperCase();
        if (mt == "GET" || mt == "HEAD") {
            return null;
        }

        //JSON 格式需要序列化成字符串
        if (callType(data) == "[object Object]") {
            return JSON.stringify(data);
        }

        return data;
    }

    /**
     * 解析url
     */
    private resolveUrl(url: string, params?: Global.obj) {
        return callType(params) != "[object Object]"
            ? url
            : Object.entries(params || {}).reduce(
                  (u, [k, v], i) => (v == undefined || v == null ? u : `${u}${i ? "&" : "?"}${k}=${v}`),
                  url
              );
    }

    /**
     * 创建客户端
     */
    private createClient(): REQUEST.Client {
        if (!fetch) {
            throw new Error("Global fetch not exist!");
        }

        return (req: REQUEST.ReqType) => fetch(req.url, req);
    }

    /**
     * 加载中间件
     */
    protected use(name: REQUEST.handlerType, handler: REQUEST.handler) {
        this[name] = [...this[name], handler];
    }
}

export const req = new RequestManagement({});
