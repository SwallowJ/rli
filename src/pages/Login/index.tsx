import React from "react";
import { Dispatch } from "redux";
import styles from "./style.less";
import { connect } from "react-redux";
import { LoginForm } from "./component";
import picImg from "@/assert/pic@2x.png";
import logoImg from "@/assert/logo@2x.png";
import footer from "@/assert/footer@2x.png";
import actions from "./actions";
import loginService from "@/pages/Login/service";
import { Button, Radio, RadioChangeEvent } from "antd";
import langservice from "@/common/core/language";

interface loginProps {
    dispatch: Dispatch;
}

const login: React.FC<loginProps> = ({ dispatch }) => {
    const [tas] = langservice.useLanguage("common");

    const login = (value: LOGIN.loginParams) => {
        loginService.login(value);
    };

    const changeRadio = (e: RadioChangeEvent) => {
        // e.target.value
    };

    const changeLang = (lang: string) => {
        dispatch({ type: "language/changeState", params: { lang } });
    };

    return (
        <div className={styles.Login}>
            <div className={styles.wrap}>
                <div className={styles.head}>
                    <img src={logoImg} />
                    <label className={styles.title}>{tas("app.title")}</label>
                </div>

                <div className={styles.content}>
                    <img src={picImg} className={styles.pic} />

                    <div className={styles.loginWrap}>
                        <label className={styles.loginLabel}>{tas("login")}</label>
                        <LoginForm onFinish={login} />
                    </div>
                </div>

                <Radio.Group onChange={changeRadio}></Radio.Group>

                <div className={styles.footer}>
                    <img src={footer} alt="" />
                    <span>{tas("app.footer")}</span>
                </div>
            </div>
        </div>
    );
};

export default connect()(login);
