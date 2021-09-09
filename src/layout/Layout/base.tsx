import { Menu } from "antd";
import * as H from "history";
import styles from "./style.less";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BaseHead } from "@/layout/Header";
import ErrorBoundary from "@/common/view/errBoundary";
import React, { useEffect, useMemo, useState } from "react";
import { namespace, AuthStateType } from "@/models/auth";

interface layoutProps extends AuthStateType {
    location: H.Location<any>;
    routers?: Aplication.routers;
}

const baseLayout: React.FC<layoutProps> = ({ routers = [], children, location, auth }) => {
    const { basePermCategory } = auth || {};
    const [selectedKey, setSelectKey] = useState("");

    const path = useMemo(() => {
        const pathname = location.pathname;
        return routers.map((x) => x.path).find((x) => x === pathname || pathname.startsWith(x));
    }, [location, routers]);

    const menulist = useMemo(() => {
        console.log(routers, basePermCategory);
    }, [routers, basePermCategory]);

    useEffect(() => {
        setSelectKey(location.pathname);
    }, [location]);

    return (
        <div className={styles.BaseLayout}>
            <BaseHead>
                <Menu mode={"horizontal"} className={styles.menu} selectedKeys={[selectedKey]}>
                    {routers.map((r) => {
                        console.log(r.data);
                        const permission: Aplication.permissionType = r.data?.["permission"];

                        if (!r.name) {
                            return null;
                        }

                        const className = path == r.path ? styles.selected : "";

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
                                    {r.routers.map((sub) => (
                                        <Menu.Item key={sub.path}>
                                            <Link to={sub.path} className={styles.menuLink}>
                                                {sub.name}
                                            </Link>
                                        </Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                            );
                        }

                        return null;
                    })}
                </Menu>
            </BaseHead>
            <ErrorBoundary>
                <div className={styles.content}>{children}</div>
            </ErrorBoundary>
        </div>
    );
};

export const BaseLayout = connect(({ [namespace]: { auth } }: { [namespace]: AuthStateType }) => ({ auth }))(
    baseLayout
);
