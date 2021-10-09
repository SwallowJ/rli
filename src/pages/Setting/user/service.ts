/**
 * Author     jfh
 * Date       2021-09-18 15:31:25.189
 * email      feihongjiang@caih.com
 * Desc       service 模板
 */

import request from "@/common/request/service";

class UserService {
    /**
     * 获取角色列表
     */
    list(params: USER.PARAMS.list) {
        return request.get<Global.Result<USER.entity[]>>("/api/xc/search/user/v2", { params }, { successResAll: true });
    }

    /**
     * 修改用户密码
     */
    changePassword(data: USER.PARAMS.password) {
        return request.post("/api/xc/user/edit/psw", { data });
    }

    /**
     * 获取用户信息
     */
    getUserInfo(params: USER.PARAMS.userId) {
        return request.get<USER.entity>(`/api/xc/user/${params.userId}`, { params });
    }

    /**
     * 更新用户信息
     */
    updata(data: USER.PARAMS.form) {
        return request.post("/api/xc/user/edit/info", { data });
    }

    /**
     * 创建用户
     */
    create(data: USER.PARAMS.form) {
        return request.post("/api/xc/user/insert", { data });
    }
}

export default new UserService();
