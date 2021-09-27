import security from "@/common/core/security";
import storage from "@/common/core/storage";
import { ReqService } from "@/common/request/service";

class LoginService extends ReqService {
    /**
     * 登录
     */
    login(params: LOGIN.loginParams) {
        return this.post<string>("/xc/login", { params, headers: { "X-CSRF-TOKEN": params.requestId ?? "" } });
    }

    /**
     * 登出
     */
    logout() {
        return this.get<string>("/api/xc/logout/password");
    }

    /**
     * 获取token, 对密码加密
     */
    getToken() {
        return this.get<LOGIN.tokenType>("/xc/login/requestId");
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
