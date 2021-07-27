/**
 * Author        feihongjiang
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   local
 */

type handleFunc<T = Global.baseType, R = void> = (key: string, value: T) => R;

type getFunc<T> = (key: string) => T;

interface storeType {
    /**
     * 存储string类型
     */
    save: handleFunc;

    /**
     * 存储对象类型
     */
    saveObj: handleFunc<Object>;

    get: getFunc<Global.langType | undefined>;
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

    decode(value: string) {
        // return Crypto.HmacSHA256(value, this.__Key).toString();
    }

    encode(value: Global.baseType) {
        // console.log("======");
        // const hash = createHmac("sha256", this.__Key).update(String(value)).digest("hex");
        // const hash = Crypto.HmacSHA256(String(value), this.__Key).toString();
        // const res = this.decode(hash);

        // console.log(hash, res);

        return String(value);
    }

    actions(engine: Storage): storeType {
        return {
            save: (key: string, value: Global.baseType) => {
                engine.setItem(key, this.encode(value));
            },

            saveObj: () => {},

            get: (key: string) => engine.getItem(key) as Global.langType | undefined,
        };
    }
}

export default new StoreManager();
