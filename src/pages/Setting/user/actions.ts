/**
 * Author     jfh
 * Date       2021-09-18 15:31:25.167
 * email      feihongjiang@caih.com
 * Desc       actions 模板
 */

import { Actions } from "@/common/reducer/actions";

export const namespace = "USER";

export class UserActions extends Actions {
    /**
     * 获取角色列表
     */
    list(roleName: string, usernameOrPhone: string, pageNum?: number, pageSize?: number) {
        return this.callAction("list", { payload: { roleName, usernameOrPhone, pageNum, pageSize } });
    }
}

export default new UserActions(namespace);
