/**
 * Author        feihongjiang
 * Date          2021-07-20
 * email         feihongjiang@caih.com
 * Description   全局配置页面
 */

import { connect } from "react-redux";
import { LangStateType } from "@/models/language";
import React, { ReactNode, useEffect } from "react";

interface globalProps {
    children: ReactNode;
    lang?: Global.langType;
}

const global: React.FC<globalProps> = ({ children, lang }) => {
    /**
     * 加载语言包
     */
    useEffect(() => {
        console.log(lang);
    }, [lang]);

    return <>{children}</>;
};

export default connect(({ language: { lang } }: { language: LangStateType }) => ({ lang }))(global);
