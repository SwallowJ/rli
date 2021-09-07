import { Dispatch } from "redux";
import styles from "./style.less";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import picImg from "@/assert/login/pic@2x.png";
import logoImg from "@/assert/login/logo@2x.png";
import footer from "@/assert/login/footer@2x.png";
import langservice from "@/common/core/language";
import action, { namespace } from "./actions";
import { LoginForm, License } from "./component";
import { Spin } from "antd";

interface loginProps extends LOGIN.StateType {
    dispatch: Dispatch;
}

const login: React.FC<loginProps> = ({ dispatch, license, loading, machineInfo }) => {
    const [tas] = langservice.useLanguage("common");

    const login = (value: LOGIN.loginParams) => {
        dispatch(action.login(value));
    };

    // console.log(license);

    /**
     * 证书校验
     */
    const getLicense = () => {
        dispatch(action.getlicense());
    };

    useEffect(() => {
        getLicense();
    }, []);

    return (
        <div className={styles.Login}>
            <div className={styles.wrap}>
                <div className={styles.head}>
                    <img src={logoImg} />
                    <label className={styles.title}>{tas("app.title")}</label>
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
                    <span>{tas("app.footer")}</span>
                </div>
            </div>
        </div>
    );
};

export default connect(({ [namespace]: { license, loading, machineInfo } }: { [namespace]: LOGIN.StateType }) => ({
    license,
    loading,
    machineInfo,
}))(login);
