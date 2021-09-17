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

export class SecurityManager {
    private token = "TOKEN";
    csrfToken = "X-CSRF-TOKEN";
    private loginFlag = "isLogin";
    private loginPath = "/login";
    private userInfo = "userInfo";
    private homePage = "homePage";

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
        storage.local.remove(this.token);
        storage.local.remove(this.csrfToken);
        storage.local.remove(this.loginFlag);

        storage.session.remove(this.homePage);
        location.href = this.loginPath;
    }

    /**
     * 登录成功
     */
    login(params: LOGIN.loginParams, remember?: boolean) {
        storage.local.save(this.loginFlag, true);
        storage.local.save(this.csrfToken, params.requestId ?? "");
        storage.local.save(this.token, `Bearer ${params._token ?? ""}`);

        setTimeout(() => {
            if (remember) {
                delete params.requestId;
                const [value, err] = WASM_CRYPTO_enAES(JSON.stringify(params));
                if (err) {
                    message.error(err);
                    return;
                }

                storage.local.save(this.userInfo, value);
            } else {
                storage.local.remove(this.userInfo);
            }
        }, 0);
    }

    getLoginFlag() {
        return storage.local.get(this.loginFlag) === "true";
    }

    isRemember() {
        return Boolean(storage.local.get(this.userInfo));
    }

    /**
     * 获取记住的用户信息
     */
    getRememberInfo() {
        const value = storage.local.get(this.userInfo);

        if (!value) {
            return null;
        }

        const [info, err] = WASM_CRYPTO_deAES(value);

        if (err) {
            message.error(err);
            return null;
        }
        try {
            return JSON.parse(info);
        } catch (_) {
            return null;
        }
    }

    /**
     * 暂存首页地址
     */
    saveHomepage(path: string) {
        storage.session.save(this.homePage, path);
    }

    getHomePage() {
        return storage.session.get(this.homePage) || "/";
    }

    getCsrfToken() {
        return storage.local.get(this.csrfToken) || "";
    }

    getToken() {
        return storage.local.get(this.token) || "";
    }
}

export default new SecurityManager();
