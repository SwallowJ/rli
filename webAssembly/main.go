package main

import (
	"fmt"
	"os"
	"os/exec"
	"sync"

	"github.com/SwallowJ/loggo"
)

var (
	logger = loggo.New("builder")
	wg     = &sync.WaitGroup{}
	outDir = "../../public/wasm/%s.wasm"
)

func init() {
	//设置WebAssembly环境
	os.Setenv("GOARCH", "wasm")
	os.Setenv("GOOS", "js")
}

func main() {
	logger.Info("开始编译WebAsembly应用")
	wg.Add(1)

	go build("crypto")

	wg.Wait()
	logger.Info("WebAssembly编译完成")
}

func build(module string) {
	defer wg.Done()
	logger.Info("开始编译模块", module)

	cmd := exec.Command("go", "build", "-o", fmt.Sprintf(outDir, module))
	//设置执行目录
	cmd.Dir = module

	if err := cmd.Run(); err != nil {
		logger.Error(err)
		return
	}

	logger.Printf("模块 %s 编译完成", module)
}
