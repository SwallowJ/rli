/**
 * Author        feihongjiang
 * Date          2021-05-21
 * email         feihongjiang@caih.com
 * Description   页面找不到时渲染
 */

import React from "react";
import styles from "./style.less";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import security from "@/common/core/security";
import { namespace, AuthStateType } from "@/models/auth";

const notFound: React.FC<AuthStateType> = ({ homePage }) => {
    return (
        <div className={styles.NotFound}>
            <span>{"Oh On 页面找不到啦"}</span>
            <Link to={homePage || security.getHomePage()}>{"返回主页"}</Link>
        </div>
    );
};

export default connect(({ [namespace]: { homePage } }: { [namespace]: AuthStateType }) => ({ homePage }))(notFound);
