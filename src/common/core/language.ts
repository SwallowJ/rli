/**
 * Author        feihongjiang
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   语言包管理工具
 */
import StorageManager from "./storage";
import { useSelector, useStore } from "react-redux";
import { LangStateType, namespace } from "@/models/language";
import { ReactText, useCallback } from "react";

class LanguageManager {
    private storeName = "LANGUAGE_TYPE";

    /**
     * 获取初始语言类型
     */
    init(): Global.LANGUAGE.Type {
        return StorageManager.local.get<Global.LANGUAGE.Type>(this.storeName) || "zh_CN";
    }

    /**
     * 语言包映射
     * @param name 语言包
     * @param de 缺省值
     * @returns
     */
    useLanguage(
        name: keyof LangStateType,
        de?: ReactText
    ): [Global.LANGUAGE.langFunc, Global.LANGUAGE.langTempFunc, Global.LANGUAGE.langType] {
        const pack: Global.LANGUAGE.langType = useSelector((states) => states[namespace][name]);

        /**
         * 语言包映射函数
         */
        const translate = useCallback((key: string) => pack?.[key] || de || name, [pack]);

        /**
         * 语言包映射函数-带模板解析
         * 模板标记 ${word}
         */
        const translateTemplate = useCallback(
            (key: string, obj: Global.obj = {}) => {
                return this.template(String(pack?.[key] || de || name), obj);
            },
            [pack]
        );

        return [translate, translateTemplate, pack];
    }

    private template(str: string, data: Global.obj) {
        const len = str.length;
        const result: string[] = [];

        let pin = -1;

        for (let i = 0; i < len; i++) {
            const ch = str[i];
            result.push(ch);

            if (ch === "$" && str[i + 1] === "{") {
                pin = i;
            } else if (ch === "}" && pin > -1) {
                const count = i - pin + 1;
                const r = data[str.slice(pin + 2, i)] ?? "";
                result.splice(result.length - count, count, String(r));
                pin = -1;
            }
        }

        return result.join("");
    }
}

export default new LanguageManager();
