import models from "./register";
import { AnyAction, Middleware } from "redux";

/**
 * action 拦截中间件
 * 调用优先级 reducers > effects
 */
export const effectMiddleware: Middleware = ({ getState }) => (next) => (action: AnyAction) => {
    let [namespace, type] = (action.type as string).split("/");

    /**
     * 获取model
     */
    const model = models.find((m) => m.namespace == namespace);

    if (!model) {
        throw new Error(`namespace [${namespace}] not found`);
    }

    if (model.reducers.hasOwnProperty(type)) {
        return next(action);
    } else if (model.effects.hasOwnProperty(type)) {
        /**
         * 异步函数调用
         * @param fn 异步函数
         * @param args 参数
         */
        const call = <T>(p: Promise<T>) => {
            p.then((v) => {
                return gen.next(v);
            });
        };

        /**
         * reducer 调用
         * @param newAction action
         */
        const put = (newAction: AnyAction) => {
            Promise.resolve()
                .then(() => {
                    newAction.type = `${namespace}/${newAction.type}`;
                    next(newAction);
                })
                .then(() => {
                    return gen.next();
                });
        };

        /**
         * 获取当前State
         */
        const select = () => getState()[namespace];

        /**
         * effect 生成器
         */
        const gen = model.effects[type](action, { call, put, select });
        gen.next();
    } else {
        console.error(`No such action: ${action.type}`);
    }
};
