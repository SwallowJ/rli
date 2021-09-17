import security from "@/common/core/security";
import storage from "@/common/core/storage";
import { ReqService } from "@/common/request/service";

class LoginService extends ReqService {
    /**
     * 登录
     */
    login(params: LOGIN.loginParams) {
        return this.post<string>("/xc/login", { params, headers: { [security.csrfToken]: params.requestId ?? "" } });
    }

    /**
     * 登出
     */
    logout() {
        return this.get("/api/xc/logout/password");
    }

    /**
     * 获取token, 对密码加密
     */
    getToken() {
        return this.get("/xc/login/requestId");
    }

    /**
     * 获取证书
     */
    getlicense() {
        return this.get<LOGIN.licenseType>(`/xc/license`, {}, { cache: true, key: "license", engine: storage.session });
    }

    /**
     * 获取机器码
     */
    getMachineInfo() {
        return this.get<LOGIN.machinceType>("/xc/license/machineInfo");
    }
}

export default new LoginService();
