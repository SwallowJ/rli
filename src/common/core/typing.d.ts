declare namespace CORE {
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

        /**
         * 获取对象类型
         */
        getObj<T extends Object>(key: string): T | null;

        /**
         * 删除对象
         */
        remove(key: string): void;

        get<T extends string = string>(key: string): T | null;

        keys(): Generator<string, any, string>;
    }

    interface themeType {
        /**
         * 主题名
         */
        name: string;
        /**
         * 主题值
         */
        value: Global.obj<string>;

        /**
         * 主题描述
         */
        desc?: string;
    }
}
