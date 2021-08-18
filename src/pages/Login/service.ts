import { ReqService } from "@/common/request/service";

class LoginService extends ReqService {
    constructor() {
        super("/api/v1/user");
    }

    /**
     * 登录
     */
    login(data: LOGIN.loginParams) {
        return new Promise<Global.resultType<string>>((resolve) => {
            setTimeout(() => {
                resolve({
                    code: 1,
                    data: "hahha",
                });
            }, 3000);
        });
    }

    test(data: LOGIN.loginParams) {
        this.post("/login", { data });
    }
}

export default new LoginService();
