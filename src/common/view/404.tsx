/**
 * Author        feihongjiang
 * Date          2021-05-21
 * email         feihongjiang@caih.com
 * Description   页面找不到时渲染
 */

import React from "react";
import styles from "./style.less";
import { Link } from "react-router-dom";

const notFound: React.FC = () => {
    return (
        <div className={styles.NotFound}>
            <span>{"Oh On 页面找不到啦"}</span>
            <Link to={"/"}>{"返回主页"}</Link>
        </div>
    );
};

export default notFound;
