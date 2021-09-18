import store from "@/common/reducer";
import { AnyAction, Dispatch } from "redux";

export class Actions {
    namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    /**
     * 修改状态action
     */
    changeState<T = any>(params: T, namespace?: string): AnyAction {
        return store.dispatch({ type: `${namespace ?? this.namespace}/changeState`, params });
    }

    /**
     * 调用effects
     */
    protected callAction<T = any>(actionName: string, params?: T, namespace?: string): AnyAction {
        return store.dispatch({ type: `${namespace ?? this.namespace}/${actionName}`, ...params });
    }

    // protected

    /**
     * 初始化状态
     */
    initState(namespace?: string): AnyAction {
        return store.dispatch({ type: `${namespace ?? this.namespace}/init` });
    }
}
