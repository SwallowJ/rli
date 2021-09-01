type errMsg = string;
type cryptoFunc = (text: string, key?: string) => [string, errMsg];

/**
 * AES加密
 */
function WASM_CRYPTO_enAES(text: string, key?: string): [string, errMsg];

/**
 * AES解密
 */
function WASM_CRYPTO_deAES(text: string, key?: string): [string, errMsg];
