/**
 * Author     feihongjiang
 * Date       2021-08-17
 * email      feihongjiang@caih.com
 * Desc       fetch请求封装
 */
import { HTTPCode } from "./handler";
import { callType } from "@/utils/functools";

export class RequestManagement {
    private options: REQUEST.options;

    /**
     * 请求结束中间件
     */
    private successHandler: REQUEST.responsehandler;

    private errorHandler: REQUEST.responsehandler;

    /**
     * 客户端
     */
    private client: REQUEST.Client;

    constructor(options: REQUEST.options = {}) {
        const defaultHandler: REQUEST.responsehandler = (res) => res.text();
        this.errorHandler = options.errorHandler || defaultHandler;
        this.successHandler = options.successHandler || defaultHandler;

        const opt = Object.assign({}, options);
        delete opt.successHandler;
        delete opt.errorHandler;

        this.options = opt;
        this.client = this.createClient();
    }

    /**
     * 发起请求(fetch)
     */
    async request<T = any>(
        method: REQUEST.MethodType,
        url: string,
        init: REQUEST.reqInit = {},
        options?: REQUEST.reqOptions
    ): Promise<T> {
        const req = this.resolveOptions(method, url, init);

        const { handFunc, errorFunc, cache, engine, key } = options || {};
        if (cache && engine) {
            const stroageKey = key || this.parseStroageKey(req);
            const result = engine.getObj<any>(stroageKey);

            if (result) {
                return result;
            }
        }

        let response: Response;
        if (this.options.timeout) {
            response = await Promise.race([this.client(req), this.timeOutFunc()]);
        } else {
            response = await this.client(req);
        }

        let RS: REQUEST.responsehandler;
        if (response.ok) {
            RS = handFunc || this.successHandler;
        } else {
            RS = errorFunc || this.errorHandler;
        }
        return RS(response, req, options?.successResAll).then((result) => {
            setTimeout(() => {
                if (cache && engine) {
                    const stroageKey = key || this.parseStroageKey(req);
                    engine.saveObj(stroageKey, result);
                }
            }, 0);
            return result;
        });
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

    private timeOutFunc() {
        const timeout = this.options.timeout;
        return new Promise<Response>((resolve) => {
            setTimeout(() => {
                resolve(
                    new Response('{"code":-1,"message":"请求超时"}', {
                        status: HTTPCode.Unauthorized,
                        statusText: "Request Timeout",
                    })
                );
            }, timeout);
        });
    }

    private parseStroageKey(req: REQUEST.ReqType) {
        return `${req.method}-${req.url}`;
    }
}

export const req = new RequestManagement({});
