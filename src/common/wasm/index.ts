import go from "./init";
import { useEffect, useState } from "react";
import { req } from "@/common/request/request";

const load = async (name: string) => {
    return req
        .request("GET", `/wasm/${name}.wasm`, {}, { handFunc: (r) => r.arrayBuffer() })
        .then((response) => WebAssembly.instantiate(response, go.importObject))
        .then(({ instance }) => {
            go.run(instance);
        })
        .catch((err) => {
            console.error(err);
        });
};

/**
 * 加载WebAssembly
 */
const loadWasm = async () => {
    return Promise.all([load("crypto")]);
};

/**
 * 加载WebAssembly hook
 */
export function useWasm(): [boolean] {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWasm().then(() => {
            setLoading(false);
        });
    }, []);

    return [loading];
}

export default loadWasm;
