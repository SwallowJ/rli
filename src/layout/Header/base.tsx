import React from "react";
import { Dispatch } from "redux";
import styles from "./style.less";
import { connect } from "react-redux";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import action from "@/pages/Login/actions";
import avatar from "@/assert/header/user@2x.png";
import logoImg from "@/assert/header/logo_white@2x.png";
import { namespace, AuthStateType } from "@/models/auth";

interface headProps extends AuthStateType {
    dispatch: Dispatch;
    children?: React.ReactNode;
}

const head: React.FC<headProps> = ({ auth, dispatch, children }) => {
    /**
     * 登出
     */
    const logout = () => {
        dispatch(action.logout());
    };

    return (
        <div className={styles.BaseHead}>
            <div className={styles.content}>
                <Link to={"/XC/home"} className={styles.logo}>
                    <img src={logoImg} />
                    <div className={styles.divider} />
                    <span className={styles.title}>{"XC项目管理系统"}</span>
                </Link>

                {children}

                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item onClick={logout}>{"登出"}</Menu.Item>
                            <Menu.Item>{"修改密码"}</Menu.Item>
                        </Menu>
                    }
                >
                    <div className={styles.authInfo}>
                        <span>{auth?.userCorporationName}</span>
                        <img src={avatar} />
                        <a>{auth?.userDisplayName}</a>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export const BaseHead = connect(({ [namespace]: { auth } }: { [namespace]: AuthStateType }) => ({ auth }))(head);
