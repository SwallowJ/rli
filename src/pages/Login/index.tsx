import React from "react";
import styles from "./style.less";
import picImg from "@/assert/pic@2x.png";
import logoImg from "@/assert/logo@2x.png";

const login: React.FC = () => {
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;
