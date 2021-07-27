package main

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"fmt"
)

var pwdKey = []byte("1234567890abcdef")

func main() {
	res, err := cry("Hello World")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(res)
}

func PKCS7Padding(originData []byte, blockSize int) []byte {
	padding := blockSize - len(originData)%blockSize

	padText := bytes.Repeat([]byte{byte(padding)}, padding)

	return append(originData, padText...)
}

func cry(input string) (string, error) {

	plaintext := []byte(input)

	block, err := aes.NewCipher(pwdKey)
	if err != nil {
		return "", err
	}

	blockSize := block.BlockSize()
	originData := PKCS7Padding(plaintext, blockSize)

	blocMode := cipher.NewCBCEncrypter(block, pwdKey[:blockSize])

	crypted := make([]byte, len(originData))

	blocMode.CryptBlocks(crypted, originData)

	fmt.Println(byteString(crypted), crypted)

	return string(crypted[:]), nil
}

func byteString(p []byte) string {
	for i := 0; i < len(p); i++ {
		if p[i] == 0 {
			return string(p[0:i])
		}
	}
	return string(p)
}
