/**
 * Author        feihongjiang
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   local
 */

type handleFunc<T = Global.baseType, R = void> = (key: string, value: T) => R;

interface storeType {
    /**
     * 存储string类型
     */
    save: handleFunc;

    /**
     * 存储对象类型
     */
    saveObj: handleFunc<Object>;

    get: <T extends string = string>(key: string) => T;
}

class StoreManager {
    private __Key = "Af12Wll1M8H";
    protected localStorage = window.localStorage;
    protected sessionStorage = window.sessionStorage;

    /**
     * localStorage
     */
    local = this.actions(localStorage);

    /**
     * sessionStorage
     */
    session = this.actions(sessionStorage);

    decode(value: string) {}

    encode(value: Global.baseType) {
        return String(value);
    }

    actions(engine: Storage): storeType {
        return {
            /**
             *存储基本数据类型
             */
            save: (key: string, value: Global.baseType) => {
                engine.setItem(key, this.encode(value));
            },

            /**
             * 获取基本数据类型
             */
            get: <T extends string = string>(key: string): T => engine.getItem(key) as T,

            saveObj: () => {},
        };
    }
}

export default new StoreManager();
