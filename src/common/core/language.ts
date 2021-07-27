/**
 * Author        feihongjiang
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   语言包管理工具
 */

import StorageManager from "./storage";

class LanguageManager {
    private storeName = "LANGUAGE_TYPE";

    /**
     * 获取初始语言类型
     */
    init(): Global.langType {
        return StorageManager.local.get(this.storeName) ?? "zh-CN";
    }
}

export default new LanguageManager();
