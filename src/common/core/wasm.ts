const load = (name: string, go: Go) => {
    WebAssembly.instantiateStreaming(fetch(`wasm/${name}.wasm`), go.importObject).then((res) => {
        go.run(res.instance);
    });
};

/**
 * 加载WebAssembly
 */
const loadWasm = () => {
    if (!Go) {
        return;
    }

    const go = new Go();
    load("crypto", go);
};

export default loadWasm;
