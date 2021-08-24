import { ReqService } from "@/common/request/service";

class LoginService extends ReqService {
    constructor() {
        super({ prefix: "/api/v1/user" });
    }

    /**
     * 登录
     */
    async login(data: LOGIN.loginParams) {
        return this.post<Global.resultType<string>>("/login", { data }).then((res) => {
            console.log("result: ", res);
        });
    }

    error(data: LOGIN.loginParams) {
        this.post("/error", { data, headers: { "Content-type": "application/json;charset=UTF-8" } }).then((res) => {
            console.log("error:", res);
        });
    }
}

export default new LoginService();
