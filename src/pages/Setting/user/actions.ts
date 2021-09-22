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

    /**
     * 修改用户密码
     */
    changeUserPwd(username: string, password: string, callback?: Function) {
        return this.callAction("changePassword", { payload: { username, password }, callback });
    }

    /**
     * 获取用户详细信息
     */
    editUserInfo(userId: number) {
        return this.callAction("editUserInfo", { payload: { userId } });
    }

    /**
     * 编辑用户信息
     */
    updata(payload: USER.PARAMS.form, callback?: Function) {
        return this.callAction("updata", { payload, callback });
    }
}

export default new UserActions(namespace);
