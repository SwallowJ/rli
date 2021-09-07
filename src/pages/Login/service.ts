import storage from "@/common/core/storage";
import { ReqService } from "@/common/request/service";

class LoginService extends ReqService {
    /**
     * 登录
     */
    async login(data: LOGIN.loginParams) {
        return this.post<Global.resultType<string>>("/login", { data }).then((res) => {
            console.log("result: ", res);
        });
    }

    /**
     * 获取证书
     */
    getlicense() {
        return this.get<LOGIN.licenseType>(
            `/xc/license`,
            {},
            { cache: true, key: "license", engine: storage.session }
        ).then(() => null);
    }

    /**
     * 获取机器码
     */
    getMachineInfo() {
        return this.get<LOGIN.machinceType>("/xc/license/machineInfo");
    }
}

export default new LoginService();
