package main

import (
	"fmt"
	"syscall/js"
)

func aes(this js.Value, args []js.Value) interface{} {
	fmt.Println("Hello WebAssembly")
	return args
}

func main() {

	js.Global().Set("aes", js.FuncOf(aes))
}
