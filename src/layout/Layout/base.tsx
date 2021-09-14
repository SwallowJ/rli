import * as H from "history";
import styles from "./style.less";
import { connect } from "react-redux";
import React, { useMemo } from "react";
import { BaseHead } from "@/layout/Header";
import NotFoundPage from "@/common/view/404";
import ErrorBoundary from "@/common/view/errBoundary";
import { namespace, AuthStateType } from "@/models/auth";

interface layoutProps extends AuthStateType {
    location: H.Location<any>;
}

const baseLayout: React.FC<layoutProps> = ({ children, location, menus = [], paths = [] }) => {
    const { pathname } = location;

    const path = useMemo(() => menus?.map((x) => x.path).find((x) => x === pathname || pathname.startsWith(x)) || "", [
        pathname,
        menus,
    ]);

    return (
        <div className={styles.BaseLayout}>
            <BaseHead location={location} />
            <ErrorBoundary>
                <div className={`xc-layout-conten ${styles.content}`}>
                    {paths.includes(path) ? children : <NotFoundPage />}
                </div>
            </ErrorBoundary>
        </div>
    );
};

export const BaseLayout = connect(({ [namespace]: { menus, paths } }: { [namespace]: AuthStateType }) => ({
    menus,
    paths,
}))(baseLayout);
