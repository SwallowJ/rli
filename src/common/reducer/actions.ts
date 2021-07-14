import { AnyAction } from "redux";

export class Actions {
    namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    protected changeState<T>(parmas: T): AnyAction {
        return { type: `${this.namespace}/changeState`, parmas };
    }

    initState(): AnyAction {
        return { type: `${this.namespace}/init` };
    }
}
