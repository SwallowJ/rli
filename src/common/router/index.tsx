/**
 * Author        feihongjiang
 * Date          2021-07-13
 * email         feihongjiang@caih.com
 * Description   路由解析
 */

import React from "react";
import routers from "@/@temp/router";
import NotFoundPage from "@/common/view/404";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

interface registerProps {
    routers?: Aplication.routers;
}

const RouterRegister: React.FC<registerProps> = ({ routers }) => {
    if (!routers?.length) {
        return null;
    }

    return (
        <Switch>
            {routers?.map((r) => {
                if (r.component) {
                    const RouterComponent = r.component;
                    return (
                        <Route key={r.path} path={r.path}>
                            {(info) => (
                                <RouterComponent {...info} routers={r.routers}>
                                    <RouterRegister routers={r.routers} />
                                </RouterComponent>
                            )}
                        </Route>
                    );
                } else if (r.redirect) {
                    return <Redirect key={r.path} to={r.redirect || "/"} />;
                }

                return (
                    <Route path={r.path} key={r.path}>
                        <RouterRegister routers={r.routers} />
                    </Route>
                );
            })}
            <Route>
                <NotFoundPage />
            </Route>
        </Switch>
    );
};

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <RouterRegister routers={routers} />
        </BrowserRouter>
    );
};

export default AppRouter;
