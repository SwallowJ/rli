/**
 * Author        feihongjiang
 * Date          2021-07-20
 * email         feihongjiang@caih.com
 * Description   全局配置页面
 */
import { Dispatch } from "redux";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import theme from "@/common/core/theme";
import { useWasm } from "@/common/wasm";
import Loading from "@/common/view/loading";
import { LangStateType } from "@/models/language";
import React, { ReactNode, useEffect } from "react";

interface globalProps extends LangStateType {
    children: ReactNode;
    dispatch: Dispatch;
}

const global: React.FC<globalProps> = ({ children, lang, dispatch }) => {
    const [loadingWasm] = useWasm();

    /**
     * 加载语言包(json文件)
     */
    const loadLanguagePackage = (name: string) => {
        dispatch({ type: "language/getPack", name });
    };

    useEffect(() => {
        loadLanguagePackage("login");
        loadLanguagePackage("layout");
    }, [lang]);

    useEffect(() => {
        theme.load();
    }, []);

    return <ConfigProvider>{loadingWasm ? <Loading /> : children}</ConfigProvider>;
};

export default connect(({ language: { lang } }: { language: LangStateType }) => ({ lang }))(global);
