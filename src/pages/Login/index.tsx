import { Spin } from "antd";
import { Dispatch } from "redux";
import styles from "./style.less";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import action, { namespace } from "./actions";
import { useHistory } from "react-router-dom";
import picImg from "@/assert/login/pic@2x.png";
import langservice from "@/common/core/language";
import { LoginForm, License } from "./component";
import logoImg from "@/assert/login/logo@2x.png";
import footer from "@/assert/login/footer@2x.png";

interface loginProps extends LOGIN.StateType {
    history?: any;
    dispatch: Dispatch;
    auth?: Global.AUTH.entity;
}

const login: React.FC<loginProps> = ({ dispatch, license, loading, machineInfo, isLogin, history }) => {
    const [tas] = langservice.useLanguage("login");

    const login = (value: LOGIN.loginParams, remember?: boolean) => {
        dispatch(action.login(value, remember));
    };

    /**
     * 证书校验
     */
    const getLicense = () => {
        dispatch(action.getlicense());
    };

    useEffect(() => {
        getLicense();
    }, []);

    useEffect(() => {
        if (isLogin) {
            dispatch(action.changeState({ loading: true }));
            dispatch({
                type: "AUTH/getAuthInfo",
                callback: () => {
                    dispatch(action.changeState({ loading: false }));
                    history.push("/XC/home");
                },
            });
        }
    }, [isLogin]);

    return (
        <div className={styles.Login}>
            <div className={styles.wrap}>
                <div className={styles.head}>
                    <img src={logoImg} />
                    <label className={styles.title}>{tas("appName")}</label>
                </div>

                <div className={styles.content}>
                    <img src={picImg} className={styles.pic} />
                    <Spin spinning={loading}>
                        <div className={styles.loginWrap}>
                            {license ? <LoginForm onFinish={login} /> : <License machineInfo={machineInfo} />}
                        </div>
                    </Spin>
                </div>

                <div className={styles.footer}>
                    <img src={footer} alt="" />
                    <span>{tas("appFooter")}</span>
                </div>
            </div>
        </div>
    );
};

export default connect(
    ({ [namespace]: { license, loading, machineInfo, isLogin } }: { [namespace]: LOGIN.StateType }) => ({
        license,
        loading,
        isLogin,
        machineInfo,
    })
)(login);
