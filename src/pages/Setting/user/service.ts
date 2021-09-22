/**
 * Author     jfh
 * Date       2021-09-18 15:31:25.189
 * email      feihongjiang@caih.com
 * Desc       service 模板
 */

import { ReqService } from "@/common/request/service";

class UserService extends ReqService {
    /**
     * 获取角色列表
     */
    list(params: USER.PARAMS.list) {
        return this.get<Global.Result<USER.entity[]>>("/api/xc/search/user/v2", { params }, { successResAll: true });
    }

    /**
     * 修改用户密码
     */
    changePassword(data: USER.PARAMS.password) {
        return this.post("/api/xc/user/edit/psw", { data });
    }

    /**
     * 获取用户信息
     */
    getUserInfo(params: USER.PARAMS.userId) {
        return this.get<USER.entity>(`/api/xc/user/${params.userId}`, { params });
    }

    /**
     * 更新用户信息
     */
    updata(data: USER.PARAMS.form) {
        return this.post("/api/xc/user/edit/info", { data });
    }
}

export default new UserService();
