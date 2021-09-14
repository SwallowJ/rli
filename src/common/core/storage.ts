/**
 * Author        feihongjiang
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   local
 */

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

    encodeObj(value: Object) {
        return JSON.stringify(value);
    }

    decodeObj<T = Object>(value: string | null): T | null {
        try {
            return value ? JSON.parse(value) : value;
        } catch (err) {
            return null;
        }
    }

    actions(engine: Storage): CORE.storeType {
        return {
            /**
             *存储基本数据类型
             */
            save: (key, value) => {
                engine.setItem(key, this.encode(value));
            },

            /**
             * 获取基本数据类型
             */
            get<T extends string>(key: string): T | null {
                return engine.getItem(key) as T;
            },

            saveObj: (key, value) => {
                engine.setItem(key, this.encodeObj(value));
            },

            getObj: <T = any>(key: string): T | null => {
                return this.decodeObj(engine.getItem(key));
            },

            remove(key) {
                engine.removeItem(key);
            },

            *keys() {
                for (let i = 0; i < engine.length; i++) {
                    const key = engine.key(i);
                    if (key) {
                        yield key;
                    }
                }
            },
        };
    }
}

export default new StoreManager();
