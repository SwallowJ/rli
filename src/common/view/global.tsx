/**
 * Author        feihongjiang
 * Date          2021-07-20
 * email         feihongjiang@caih.com
 * Description   全局配置页面
 */
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { useWasm } from "@/common/wasm";
import Loading from "@/common/view/loading";
import { LangStateType } from "@/models/language";
import React, { ReactNode, useEffect } from "react";

interface globalProps extends LangStateType {
    children: ReactNode;
    dispatch: Dispatch;
}

const global: React.FC<globalProps> = ({ children, lang, dispatch, common }) => {
    const [loadingWasm] = useWasm();

    /**
     * 加载语言包(json文件)
     */
    const loadLanguagePackage = (name: string) => {
        dispatch({ type: "language/getPack", name, lang });
    };

    useEffect(() => {
        loadLanguagePackage("common");
    }, [lang]);

    return <>{loadingWasm ? <Loading /> : children}</>;
};

export default connect(({ language: { lang, common } }: { language: LangStateType }) => ({ lang, common }))(global);
