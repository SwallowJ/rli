/**
 * Author     jfh
 * Date       2021-08-24
 * email      feihongjiang@caih.com
 * Desc       用户安全管理
 */

import { message } from "antd";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import storage from "@/common/core/storage";
import { AuthStateType, namespace } from "@/models/auth";

interface wrapperProps {
    dispatch: Dispatch;
    auth?: Global.AUTH.entity;
}

export class SecuretyManager {
    private csrfToken = "csrfToken";
    private loginFlag = "isLogin";
    private loginPath = "/login";
    private userInfo = "userInfo";

    /**
     * 用户登录权限校验(获取用户信息)
     */
    verify(Component: React.FC<any>) {
        const wrapper: React.FC<wrapperProps> = (props) => {
            useEffect(() => {
                props.auth || props.dispatch({ type: `${namespace}/getAuthInfo` });
            }, []);
            return <Component {...props} />;
        };

        return connect(({ [namespace]: { auth } }: { [namespace]: AuthStateType }) => ({ auth }))(wrapper);
    }

    /**
     * 未登录或登录已超时
     */
    unauthorized() {
        storage.local.remove(this.loginFlag);
        storage.local.save("URL", location.href);
        location.href = this.loginPath;
    }

    /**
     * 登录成功
     */
    loginSuccess(params: LOGIN.loginParams, remember?: boolean) {
        const csrfToken = params._csrf;
        storage.local.save(this.csrfToken, csrfToken!);
        storage.local.save(this.loginFlag, true);

        setTimeout(() => {
            if (remember) {
                delete params._csrf;
                const [value, err] = WASM_CRYPTO_enAES(JSON.stringify(params));
                if (err) {
                    message.error(err);
                    return;
                }

                storage.local.save(this.userInfo, value);
            }
        }, 0);
    }

    getLoginFlag() {
        return storage.local.get(this.loginFlag) === "true";
    }
}

export default new SecuretyManager();
