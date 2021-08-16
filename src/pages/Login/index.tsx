import React from "react";
import { Dispatch } from "redux";
import styles from "./style.less";
import { connect } from "react-redux";
import { LoginForm } from "./component";
import picImg from "@/assert/pic@2x.png";
import logoImg from "@/assert/logo@2x.png";
import footer from "@/assert/footer@2x.png";
import actions from "./actions";

interface loginProps {
    dispatch: Dispatch;
}

const login: React.FC<loginProps> = ({ dispatch }) => {
    const login = (value: LOGIN.loginParams) => {
        const res = dispatch(actions.login(value));

        console.log(res);
    };

    return (
        <div className={styles.Login}>
            <div className={styles.wrap}>
                <div className={styles.head}>
                    <img src={logoImg} />
                    <label className={styles.title}>{"XC项目管理系统"}</label>
                </div>

                <div className={styles.content}>
                    <img src={picImg} className={styles.pic} />

                    <div className={styles.loginWrap}>
                        <label className={styles.loginLabel}>{"用户登录"}</label>
                        <LoginForm onFinish={login} />
                    </div>
                </div>

                <div className={styles.footer}>
                    <img src={footer} alt="" />
                    <span>{"技术支持：中国—东盟信息港股份有限公司"}</span>
                </div>
            </div>
        </div>
    );
};

export default connect()(login);
