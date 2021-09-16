/**
 * Author        jfh
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   主题管理工具
 */
import less from "less";
import storage from "@/common/core/storage";

class ThemeManagement {
    private prefix = "THEME_";
    private currentKey = "currentTheme";

    load(name?: string | null) {
        let key = name;
        if (!key) {
            key = storage.local.get(this.currentKey);
        }
        if (!key) {
            return;
        }

        const theme = storage.local.getObj<CORE.themeType>(key);

        if (theme) {
            this.replace(theme.value);
        }
    }

    /**
     * 替换主题
     */
    replace(theme: Global.obj<string>) {
        return less.modifyVars(theme);
    }

    /**
     * 本地保存主题
     */
    save(params: CORE.themeType) {
        storage.local.saveObj(this.createKey(params.name), params);
    }

    /**
     * 设置当前主题
     */
    saveCurrent(name?: string) {
        if (name) {
            storage.local.save(this.currentKey, this.createKey(name));
        } else {
            storage.local.remove(this.currentKey);
        }
    }

    private createKey = (name: string) => {
        return `${this.prefix}${name}`;
    };
}

export default new ThemeManagement();
