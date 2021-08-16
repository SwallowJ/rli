class LoginService {
    /**
     * 登录
     */
    login(data: LOGIN.loginParams) {
        return new Promise<Global.resultType<string>>((resolve) => {
            setTimeout(() => {
                resolve({
                    code: 1,
                    data: "hahha",
                });
            }, 3000);
        });
    }
}

export default new LoginService();
