/**
 * 语言包相关
 */
declare namespace LANGUAGE {
    interface StateType {
        dev?: Global.LANGUAGE.code;
        lang?: Global.LANGUAGE.Type;
        login?: Global.LANGUAGE.code;
        layout?: Global.LANGUAGE.code;
        system?: Global.LANGUAGE.code;
        component?: Global.LANGUAGE.code;
    }

    /**
     * 语言类型
     */
    type Type = "zh_CN" | "en_US";

    /**
     * 语言类型
     */
    interface code {
        [key: string]: string | code;
    }

    type langType = code | undefined;

    /**
     * 语言包映射函数
     */
    type langFunc = (...keys: (string | undefined)[]) => string;

    type langTempFunc = (obj: Global.obj, ...keys: (string | undefined)[]) => string;
}
