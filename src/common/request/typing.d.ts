declare namespace REQUEST {
    type MethodType = "get" | "post" | "delete" | "put" | "patch" | "head" | "options" | "rpc" | string;

    interface options extends RequestInit {
        prefix?: string;
        timeout?: number;
        preHandler?: preHandler[];
        errorHandler?: errorHandler[];
        successHandler?: successHandler[];
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

    type handler<T = any, R = any> = (params: T) => R;
    type handlerType = "successHandler" | "errorHandler";

    type successHandler = handler;

    type errorHandler = handler;
}
