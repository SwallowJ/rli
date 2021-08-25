declare namespace Global {
    /**
     * 常用组件属性
     */
    interface component {
        className?: string;
        children?: React.ReactNode;
        style?: React.CSSProperties;
    }

    /**
     * 基本数据类型
     */
    type baseType = string | number | boolean;

    /**
     * 通用请求返回类型
     */
    interface resultData<T = any> {
        code: 0 | 1;
        data?: T;
        message?: string;
    }

    type resultType<T = any> = resultData<T> | undefined;

    interface obj {
        [key: string]: number | string | boolean;
    }

    namespace LANGUAGE {
        /**
         * 语言类型
         */
        type Type = "zh_CN" | "en_US";

        /**
         * 语言类型
         */
        interface code {
            [key: string]: string;
        }

        type langType = code | undefined | null;

        /**
         * 语言包映射函数
         */
        type langFunc = (key: string) => React.ReactText;

        type langTempFunc = (key: string, obj?: Global.obj) => React.ReactText;
    }
}
