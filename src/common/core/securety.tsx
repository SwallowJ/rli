/**
 * Author     jfh
 * Date       2021-08-24
 * email      feihongjiang@caih.com
 * Desc       用户安全管理
 */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
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
                console.log("===");
            }, []);
            return <Component {...props} />;
        };

        return connect(({ [namespace]: { auth } }: { [namespace]: AuthStateType }) => ({ auth }))(wrapper);
    }
}

export default new SecuretyManager();
