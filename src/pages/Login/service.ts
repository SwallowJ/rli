import storage from "@/common/core/storage";
import request from "@/common/request/service";

class LoginService {
    /**
     * 登录
     */
    login(params: LOGIN.loginParams) {
        return request.post<string>("/xc/login", { params, headers: { "X-CSRF-TOKEN": params.requestId ?? "" } });
    }

    /**
     * 登出
     */
    logout() {
        return request.get<string>("/api/xc/logout/password");
    }

    /**
     * 获取token, 对密码加密
     */
    getToken() {
        return request.get<LOGIN.tokenType>("/xc/login/requestId");
    }

    /**
     * 获取证书
     */
    getlicense() {
        return request.get<LOGIN.licenseType>(
            `/xc/license`,
            {},
            { cache: true, key: "license", engine: storage.session }
        );
    }

    /**
     * 获取机器码
     */
    getMachineInfo() {
        return request.get<LOGIN.machinceType>("/xc/license/machineInfo");
    }
}

export default new LoginService();
