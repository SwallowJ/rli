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
