import { AnyAction } from "redux";

export class Actions {
    namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    /**
     * 修改状态action
     */
    protected changeState<T>(parmas: T): AnyAction {
        return { type: `${this.namespace}/changeState`, parmas };
    }

    /**
     * 调用effects
     */
    protected callAction<T>(actionName: string, params?: T) {
        return { type: `${this.namespace}/${actionName}`, ...params };
    }

    /**
     * 初始化状态
     */
    initState(): AnyAction {
        return { type: `${this.namespace}/init` };
    }
}
