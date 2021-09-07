/**
 * Author     jfh
 * Date       2021-08-24
 * email      feihongjiang@caih.com
 * Desc       用户安全管理
 */

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
    /**
     * 用户登录权限校验(获取用户信息)
     */
    verify(Component: React.FC<any>) {
        const wrapper: React.FC<wrapperProps> = (props) => {
            useEffect(() => {
                props.dispatch({ type: `${namespace}/getAuthInfo` });
            }, []);
            return <Component {...props} />;
        };

        return connect(({ [namespace]: { auth } }: { [namespace]: AuthStateType }) => ({ auth }))(wrapper);
    }

    /**
     * 未登录或登录已超时
     */
    unauthorized() {
        storage.local.remove("isLogin");
        storage.local.save("URL", location.href);
        location.href = "/login";
    }
}

export default new SecuretyManager();
