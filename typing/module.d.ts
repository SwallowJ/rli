/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        readonly PUBLIC_URL: string;
    }
}

type cryptoFunc = (text: string, key?: string) => [string, string];

class Go {
    constructor();
    importObject?: WebAssembly.Imports;
    run(instance: WebAssembly.Instance);
}

interface Window {
    /**
     * AES加密
     */
    WASM_CRYPTO_enAES?: cryptoFunc;

    /**
     * AES解密
     */
    WASM_CRYPTO_deAES?: cryptoFunc;
}

declare module "*.bmp" {
    const src: string;
    export default src;
}

declare module "*.gif" {
    const src: string;
    export default src;
}

declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.jpeg" {
    const src: string;
    export default src;
}

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.webp" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    import * as React from "react";

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

    const src: string;
    export default src;
}

declare module "*.module.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.less" {
    const classes: { readonly [key: string]: string };
    export default classes;
}
