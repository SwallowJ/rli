/**
 * Author        feihongjiang
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   语言包管理工具
 */

import StorageManager from "./storage";

class LanguageManager {
    private storeName = "LANGUAGE_TYPE";

    init(lan?: Global.langType) {
        StorageManager.local.save(this.storeName, "Hello World");
        return "zh-CN";
    }
}

export default new LanguageManager();
