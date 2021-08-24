declare namespace REQUEST {
    type MethodType = "get" | "post" | "delete" | "put" | "patch" | "head" | "options" | "rpc" | string;

    interface options extends RequestInit {
        /**
         * 请求前缀
         */
        prefix?: string;

        /**
         * 超时时间
         */
        timeout?: number;
        errorHandler?: responsehandler;
        successHandler?: responsehandler;
    }

    interface reqInit extends RequestInit {
        data?: BodyInit | null | any;

        /**
         * url参数
         */
        params?: any;
    }

    interface ReqType extends RequestInit {
        url: string;
    }

    type Client = (req: ReqType) => Promise<Response>;

    type responsehandler<T = any> = (res: Response, req: ReqType) => Promise<T>;

    type handlerType = "successHandler" | "errorHandler";

    interface reqOptions {
        handFunc?: responsehandler;
        errorFunc?: responsehandler;
    }
}
