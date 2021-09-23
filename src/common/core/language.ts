/**
 * Author        feihongjiang
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   语言包管理工具
 */
import store from "@/common/reducer";
import StorageManager from "./storage";
import { useSelector } from "react-redux";
import zh_CN from "antd/lib/locale/zh_CN";
import en_US from "antd/lib/locale/en_US";
import { namespace } from "@/models/language";
import { ReactText, useCallback, useMemo } from "react";

class LanguageManager {
    private storeName = "language";

    private langMap = new Map([
        ["zh_CN", zh_CN],
        ["en_US", en_US],
    ]);

    langlist: Global.LANGUAGE.Type[] = ["zh_CN", "en_US"];

    /**
     * 获取初始语言类型
     */
    init(): Global.LANGUAGE.Type {
        return StorageManager.local.get<Global.LANGUAGE.Type>(this.storeName) || "zh_CN";
    }

    save(lang: Global.LANGUAGE.Type) {
        StorageManager.local.save(this.storeName, lang);
    }

    /**
     * 语言包映射
     * @param name 语言包
     * @param de 缺省值
     * @returns
     */
    useLanguage(
        name: keyof Global.LANGUAGE.StateType,
        de?: ReactText
    ): [Global.LANGUAGE.langFunc, Global.LANGUAGE.langTempFunc, Global.LANGUAGE.langType] {
        const pack: Global.LANGUAGE.langType = useSelector((states) => states[namespace][name]);

        /**
         * 语言包映射函数
         */
        const translate = useCallback((key?: string) => String(pack?.[key ?? ""] || de || key), [pack]);

        /**
         * 语言包映射函数-带模板解析
         * 模板标记 ${word}
         */
        const translateTemplate = useCallback(
            (key?: string, obj: Global.obj = {}) => this.template(String(pack?.[key ?? ""] || de || name), obj),
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

    uselocal(lang?: Global.LANGUAGE.Type) {
        const local = useMemo(() => this.langMap.get(lang ?? ""), [lang]);
        return [local];
    }

    /**
     * 获取语言包函数
     */
    getLangAsync(name: keyof Global.LANGUAGE.StateType, key: string) {
        const state = store.getState()["language"][name];
        return state?.[key] ?? key;
    }

    getLangAsyncTemp(name: keyof Global.LANGUAGE.StateType, key: string, obj: Global.obj = {}): string {
        const state = store.getState()["language"][name];
        return this.template(state?.[key] ?? name, obj);
    }
}

export default new LanguageManager();
