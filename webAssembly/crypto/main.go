package main

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"errors"
	"syscall/js"
)

//密钥
var __KEY = "d1346422-t844-9ace-oMn3-Po41sM91bz0O"

type handFunc func(key, text string) (string, error)

func pKCS7Padding(originData []byte, blockSize int) []byte {
	padding := blockSize - len(originData)%blockSize
	padText := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(originData, padText...)
}

func pKCS7UnPadding(origData []byte) ([]byte, error) {
	length := len(origData)
	if length == 0 {
		return nil, errors.New("加密字符串错误！")
	} else {
		unpadding := int(origData[length-1])
		return origData[:(length - unpadding)], nil
	}
}

//Aes加密
func enAes(primaryKey, text string) (string, error) {

	key := []byte(primaryKey[:16])
	iv := []byte(primaryKey[len(primaryKey)-16:])

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	originData := pKCS7Padding([]byte(text), block.BlockSize())
	crypted := make([]byte, len(originData))
	cipher.NewCBCEncrypter(block, iv).CryptBlocks(crypted, originData)

	return base64.StdEncoding.EncodeToString(crypted), nil
}

//Aes 解密
func deAes(primaryKey, text string) (string, error) {

	key := []byte(primaryKey[:16])
	iv := []byte(primaryKey[len(primaryKey)-16:])

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	originData, err := base64.StdEncoding.DecodeString(text)
	if err != nil {
		return "", err
	}

	origData := make([]byte, len(originData))
	cipher.NewCBCDecrypter(block, iv).CryptBlocks(origData, originData)

	res, err := pKCS7UnPadding(origData)

	if err != nil {
		return "", err
	}

	return string(res), nil
}

func handler(args []js.Value, fn handFunc) interface{} {
	key := __KEY
	if len(args) > 1 {
		key = args[1].String()
	}

	if len(key) < 16 {
		return []interface{}{"", "密钥长度不能小于16"}
	}

	res, err := fn(key, args[0].String())
	if err != nil {
		return []interface{}{"", err.Error()}
	}
	return []interface{}{res, ""}
}

func enCrypt(this js.Value, args []js.Value) interface{} {
	return handler(args, enAes)
}

func deCrypt(this js.Value, args []js.Value) interface{} {
	return handler(args, deAes)
}

func main() {
	js.Global().Set("WASM_CRYPTO_enAES", js.FuncOf(enCrypt))
	js.Global().Set("WASM_CRYPTO_deAES", js.FuncOf(deCrypt))
	<-make(chan bool)
}
