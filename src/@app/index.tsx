/**
 * Author        jiangfh
 * Date          2021-05-11
 * email         feihongjiang@caih.com
 * Description   web入口
 */

import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import store from "@/common/reducer";
import { Provider } from "react-redux";
import AppRouter from "../common/router";
import load_Wasm from "@/common/core/wasm";
import GlobalPage from "@/pages/Common/global";

load_Wasm();

ReactDOM.render(
    <Provider store={store}>
        <GlobalPage>
            <AppRouter />
        </GlobalPage>
    </Provider>,
    document.getElementById("root")
);
