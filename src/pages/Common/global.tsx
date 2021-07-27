/**
 * Author        feihongjiang
 * Date          2021-07-20
 * email         feihongjiang@caih.com
 * Description   全局配置页面
 */

import React, { useEffect } from "react";

const global: React.FC = ({ children }) => {
    useEffect(() => {
        //     const el = document.createElement("script");
        //     el.type = "text/javascript";
        //     el.async = true;
        //     el.src = "/wasm_exec.js";
        //     document.head.appendChild(el);
        //     setTimeout(() => {
        //         //@ts-ignore
        //         const go = new Go();
        //         WebAssembly.instantiateStreaming(fetch("wasm/crypto.wasm"), go.importObject).then((res) => {
        //             go.run(res.instance);
        //         });
        //     }, 1000);
        //     console.log(window);
        //     //@ts-ignore
        //     // WASM_AES && WASM_AES();
        //     window.WASM_CRYPTO_enAES && window.WASM_CRYPTO_enAES("admin");
        // console.log(window.WASM_CRYPTO_enAES);
    }, []);

    return <>{children}</>;
};

export default global;
