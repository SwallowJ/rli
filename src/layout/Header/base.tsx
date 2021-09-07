import React from "react";
import styles from "./style.less";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import avatar from "@/assert/header/user@2x.png";
import logoImg from "@/assert/header/logo_white@2x.png";

interface headProps {
    routers: Aplication.routers;
}

const head: React.FC<headProps> = ({ routers }) => {
    // console.log(routers);
    return (
        <div className={styles.BaseHead}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Link to={"/XC/home"}>
                        <img src={logoImg} />
                    </Link>
                    <div className={styles.divider} />
                    <span className={styles.title}>{"XC项目管理系统"}</span>
                </div>
                <div className={styles.menu}></div>

                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>{"登出"}</Menu.Item>
                            <Menu.Item>{"修改密码"}</Menu.Item>
                        </Menu>
                    }
                >
                    <div className={styles.authInfo}>
                        <img src={avatar} />
                    </div>
             
                </Dropdown>
            </div>
        </div>
    );
};

export const BaseHead = head;
