import * as H from "history";
import { Dispatch } from "redux";
import styles from "./style.less";
import { connect } from "react-redux";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import action from "@/pages/Login/actions";
import avatar from "@/assert/header/user@2x.png";
import logoImg from "@/assert/header/logo_white@2x.png";
import { namespace, AuthStateType } from "@/models/auth";
import React, { useEffect, useMemo, useState } from "react";
import { ChangePassword } from "@/layout/component/changePassword";

interface headProps extends AuthStateType {
    dispatch: Dispatch;
    location: H.Location<any>;
}

const head: React.FC<headProps> = ({ auth, dispatch, homePage = "/", menus, location }) => {
    const { pathname } = location;

    const [selectedKey, setSelectKey] = useState("");

    const path = useMemo(() => menus?.map((x) => x.path).find((x) => x === pathname || pathname.startsWith(x)) || "", [
        pathname,
        menus,
    ]);

    /**
     * 登出
     */
    const logout = () => {
        dispatch(action.logout());
    };

    /**
     * 修改密码
     */
    const changPassword = () => {};

    useEffect(() => {
        setSelectKey(pathname);
    }, [pathname]);

    return (
        <div className={styles.BaseHead}>
            <div className={styles.content}>
                <Link to={homePage} className={styles.logo}>
                    <img src={logoImg} />
                    <div className={styles.divider} />
                    <span className={styles.title}>{"XC项目管理系统"}</span>
                </Link>

                <Menu mode={"horizontal"} className={styles.menu} selectedKeys={[selectedKey]}>
                    {menus?.map((r) => {
                        const className = `${styles.menuItem} ${path == r.path ? styles.selected : ""}`;

                        if (r.component) {
                            return (
                                <Menu.Item key={r.path} className={className}>
                                    <Link to={r.path} className={styles.menuLink}>
                                        {r.name}
                                    </Link>
                                </Menu.Item>
                            );
                        }
                        if (r.routers?.length) {
                            return (
                                <Menu.SubMenu key={r.path} title={r.name} className={className}>
                                    {r.routers.map((sub) => {
                                        if (r.path === "/XC/setting" && sub.key === "fileupload") {
                                            return (
                                                <Menu.Item key={sub.path} className={styles.subItem}>
                                                    {sub.name}
                                                </Menu.Item>
                                            );
                                        }
                                        return (
                                            <Menu.Item key={sub.path} className={styles.subItem}>
                                                <Link to={sub.path} className={styles.subMenuLink}>
                                                    {sub.name}
                                                </Link>
                                            </Menu.Item>
                                        );
                                    })}
                                </Menu.SubMenu>
                            );
                        }

                        return null;
                    })}
                </Menu>

                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item onClick={logout}>{"登出"}</Menu.Item>
                            <Menu.Item onClick={changPassword}>
                                <ChangePassword>{"修改密码"}</ChangePassword>
                            </Menu.Item>
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

export const BaseHead = connect(({ [namespace]: { auth, homePage, menus } }: { [namespace]: AuthStateType }) => ({
    auth,
    menus,
    homePage,
}))(head);
