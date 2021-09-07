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

        /**
         * 是否缓存在本地
         * 将请求结果序列化成string
         */
        cache?: boolean;
        /**
         * 缓存的key
         * 缺省时根据url和body中的参数计算
         */
        key?: string;

        /**
         * 缓存的组
         * default=global
         */
        group?: string;

        /**
         * 缓存引擎对象
         */
        engine?: CORE.storeType;
    }
}
