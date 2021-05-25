/**
 * Author        jiangfh
 * Date          2021-05-11
 * email         feihongjiang@caih.com
 * Description   web入口
 */

import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router";
import store from "./reducer";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById("root")
);
