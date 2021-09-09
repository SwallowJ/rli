import { Actions } from "@/common/reducer/actions";

export const namespace = "LOGIN";

export class LoginActions extends Actions {
    login(payload: LOGIN.loginParams, remember?: boolean) {
        return this.callAction("login", { payload, remember });
    }

    getlicense() {
        return this.callAction("license");
    }

    logout(callback?: Function) {
        return this.callAction("logout", { callback });
    }
}

export default new LoginActions(namespace);
