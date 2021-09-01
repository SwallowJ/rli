import { useEffect, useState } from "react";
import go from "./init";

const load = async (name: string) => {
    return fetch(`wasm/${name}.wasm`)
        .then((response) => WebAssembly.instantiateStreaming(response, go.importObject))
        .then(({ instance }) => {
            go.run(instance);
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
