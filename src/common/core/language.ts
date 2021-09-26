/**
 * Author        feihongjiang
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   语言包管理工具
 */
import moment from "moment";
import "moment/locale/zh-cn";
import store from "@/common/reducer";
import StorageManager from "./storage";
import { useSelector } from "react-redux";
import zh_CN from "antd/lib/locale/zh_CN";
import en_US from "antd/lib/locale/en_US";
import { namespace } from "@/models/language";
import { ReactText, useCallback, useEffect, useMemo } from "react";

class LanguageManager {
    private storeName = "language";

    private langMap = new Map([
        ["zh_CN", zh_CN],
        ["en_US", en_US],
    ]);

    private langMoment = new Map<Global.LANGUAGE.Type, string>([
        ["zh_CN", "zh-cn"],
        ["en_US", "en"],
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
        ...defaultKeys: string[]
    ): [Global.LANGUAGE.langFunc, Global.LANGUAGE.langTempFunc, Global.LANGUAGE.langType] {
        const pack: Global.LANGUAGE.langType = useSelector((states) => states[namespace][name]);

        /**
         * 语言包映射函数
         */
        const translate = useCallback(
            (...keys: (string | undefined)[]): string =>
                this.position(pack, [...defaultKeys, ...keys]) ?? [...defaultKeys, ...keys].join("-"),
            [pack]
        );

        /**
         * 语言包映射函数-带模板解析
         * 模板标记 ${word}
         */
        const translateTemplate = useCallback(
            (obj: Global.obj, ...keys: (string | undefined)[]) => {
                const str = this.position(pack, [...defaultKeys, ...keys]);
                if (str) {
                    return this.template(str, obj);
                }
                return [...defaultKeys, ...keys].join("-");
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

    private position(pack: Global.LANGUAGE.langType, keys: (string | undefined)[]): string | undefined {
        if (!keys.length) {
            return;
        }
        const de = keys.join("-");
        let words: Global.LANGUAGE.langType | string = pack;

        for (const key of keys) {
            if (!key) {
                return;
            }

            if (!words || typeof words !== "object") {
                return words;
            }
            words = words[key];
        }

        if (typeof words === "object") {
            return;
        }
        return words;
    }

    uselocal(lang?: Global.LANGUAGE.Type) {
        const local = useMemo(() => this.langMap.get(lang ?? ""), [lang]);

        useEffect(() => {
            if (lang) {
                const l = this.langMoment.get(lang);
                l && moment.locale(l);
            }
        }, [lang]);

        return [local];
    }

    /**
     * 获取语言包函数
     */
    getLangAsync(name: keyof Global.LANGUAGE.StateType, ...keys: string[]) {
        const pack = store.getState()["language"][name];
        return this.position(pack, keys) ?? keys.join("-");
    }

    getLangAsyncTemp(name: keyof Global.LANGUAGE.StateType, obj: Global.obj = {}, ...keys: string[]) {
        const pack = store.getState()["language"][name];
        const str = this.position(pack, keys);
        if (!str) {
            return keys.join("-");
        }
        return this.template(str, obj);
    }
}

export default new LanguageManager();
