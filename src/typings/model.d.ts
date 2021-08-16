import { Reducer, AnyAction } from "redux";

export interface ReducersMapObject<S = any> {
    [key: string]: Reducer<S>;
}

type Gen<T = any> = Generator<void, void, T>;

export type GenType<T = any> = Gen<Global.resultType<T>>;

interface effectCode<S = any> {
    [key: string]: (action: AnyAction, effects: EffectsCommandMap<S>) => Gen;
}

interface EffectsCommandMap<S> {
    /**
     * 获取 State属性
     */
    select(): S;

    /**
     * 调用reducer
     */
    put(action: AnyAction): void;

    /**
     * 异步函数调用
     */
    // call(fn: <T = any>(params?: any) => Promise, args?: any): T;

    call<T = any>(p: Promise<T>): void;
}

export interface modelType<S = any> {
    /**
     * 初始状态值
     */
    state: S;
    /**
     * 命名空间
     * 唯一标识
     */
    namespace: string;

    /**
     * 异步请求调用
     * 优先级低于reducers
     */
    effects: effectCode<S>;

    /**
     * reducer 函数
     * 调用路径: ${namespace}/function
     */
    reducers: ReducersMapObject<S>;
}
