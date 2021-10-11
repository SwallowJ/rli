/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param wait 延迟时间 default=300ms
 */
export function debounce<T extends Function>(fn: T, wait = 200) {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, wait);
    };
}

export function throttle<T extends Function>(fn: T, delay = 200) {
    let timer: NodeJS.Timeout | null;
    return (...args: any) => {
        if (timer) {
            return;
        }
        fn(args);
        timer = setTimeout(() => {
            timer && clearTimeout(timer);
            timer = null;
        }, delay);
    };
}

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

interface compareProps {
    /**
     * 待比较对象
     */
    obj1: object | undefined | null;
    obj2: object | undefined | null;

    /**
     * 递归深度对比
     */
    deep?: boolean;

    /**
     * 数组是否排序
     */
    sort?: boolean;
}

/**
 * 递归比较两个对象是否一致
 * 支持Object, Array
 * TODO - Map, Set
 */
export const isEqual = (opionts: compareProps): boolean => {
    const { obj1, obj2, deep, sort = true } = opionts;

    if (obj1 === undefined || obj2 === undefined || obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }

    const type1 = callType(obj1);
    const type2 = callType(obj2);
    if (type1 !== type2) {
        return false;
    }

    switch (type1) {
        case "[object Object]":
            const key1 = Object.keys(obj1);
            const key2 = Object.keys(obj2);
            if (key1.length != key2.length) {
                return false;
            }
            return key1.every((k) => isEqual({ ...opionts, obj1: obj1[k], obj2: obj2[k] }));

        case "[object Array]":
            const temp1 = obj1 as Array<any>;
            const temp2 = obj2 as Array<any>;
            if (temp1.length !== temp2.length) {
                return false;
            }
            if (sort) {
                temp1.sort();
                temp2.sort();
            }
            return temp1.every((x, i) => isEqual({ ...opionts, obj1: temp2[i], obj2: x }));

        default:
            return deep ? JSON.stringify(obj1) === JSON.stringify(obj2) : obj1 === obj2;
    }
};

export const isNull = (target: any) => target === null || target === undefined;

export class Random {
    /**
     * 随机字符串
     * @param len 字符串长度
     * @param list 待选字符集x
     * @returns string
     */
    static string(len = 8, list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
        return Array(len)
            .fill("")
            .map((_) => list[Math.round(Math.random() * (list.length - 1))])
            .join("");
    }

    /**
     * 随机颜色
     */
    static color() {
        return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
    }
}
