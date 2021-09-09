/**
 * Author        feihongjiang
 * Date          2021-05-20
 * email         feihongjiang@caih.com
 * Description   页面加载完成之前的等待页面
 */

import React from "react";
import styles from "./style.less";

const loading: React.FC = () => {
    return (
        <div className={styles.Loading}>
            <div className={styles.wrap}>
                <span>{"加载中..."}</span>
            </div>
        </div>
    );
};

export default loading;
