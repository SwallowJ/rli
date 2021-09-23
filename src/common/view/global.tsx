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
import Config from "@/common/core/config";
import Loading from "@/common/view/loading";
import { PockBall } from "./component/pockball";
import langservice from "@/common/core/language";
import React, { ReactNode, useEffect } from "react";

interface globalProps extends Global.LANGUAGE.StateType {
    children: ReactNode;
    dispatch: Dispatch;
}

const global: React.FC<globalProps> = ({ children, lang, dispatch }) => {
    const [loadingWasm] = useWasm();

    const [local] = langservice.uselocal(lang);

    /**
     * 加载语言包(json文件)
     */
    const loadLanguagePackage = (name: keyof Global.LANGUAGE.StateType) => {
        dispatch({ type: "language/getPack", name });
    };

    useEffect(() => {
        loadLanguagePackage("login");
        loadLanguagePackage("layout");
        loadLanguagePackage("system");
        loadLanguagePackage("component");
        Config.NODE_ENV === "development" && loadLanguagePackage("dev");
    }, [lang]);

    useEffect(() => {
        theme.load();
    }, []);

    return (
        <ConfigProvider locale={local}>
            {loadingWasm ? <Loading /> : children}
            {Config.NODE_ENV === "development" && <PockBall />}
        </ConfigProvider>
    );
};

export default connect(({ language: { lang } }: { language: Global.LANGUAGE.StateType }) => ({ lang }))(global);
