/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param wait 延迟时间 default=300ms
 */
export const debounce = (fn: any, wait = 200) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, wait);
    };
};

/**
 * 获取对象类型
 */
export const callType = (obj: any) => Object.prototype.toString.call(obj);

/**
 * 单例模式
 */
export function Single<T extends { new (...args: any[]): {} }>(constructor: T) {
    let __INSTANCE: any = null;
    return class extends constructor {
        constructor(...args: any) {
            if (__INSTANCE) {
                return __INSTANCE;
            }
            super(...args);
            __INSTANCE = this;
        }
    };
}
