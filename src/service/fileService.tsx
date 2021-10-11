import React from "react";
import { Form, message } from "antd";
import { Random } from "@/utils/functools";
import { Modal, Input } from "@/component";
import security from "@/common/core/security";
import language from "@/common/core/language";
import request from "@/common/request/service";
import { fileSuccessHandler } from "@/common/request/handler";

class FileService {
    /**
     * 文件上传
     */
    upload(url: string, init?: REQUEST.reqInit) {
        return request.post(url, init);
    }

    download(url: string, init?: REQUEST.reqInit) {
        return request.extends<string>(
            init?.method ?? "GET",
            url,
            { ...init, headers: { [security.csrfToken]: security.getCsrfToken() } },
            { handFunc: fileSuccessHandler }
        );
    }

    /**
     * 文件下载密码校验
     */
    confirmPassword() {
        return new Promise((resolve) => {
            const ID = `CPW-${Random.string(4)}`;
            Modal.confirm({
                icon: null,
                title: language.getLangAsync("system", "file.download.confirm.title"),
                content: (
                    <Form>
                        <Form.Item
                            name={ID}
                            rules={[
                                {
                                    required: true,
                                    message: language.getLangAsync("system", "file.download.confirm.require"),
                                },
                            ]}
                        >
                            <Input.Password id={ID} />
                        </Form.Item>
                    </Form>
                ),

                onOk: (close) => {
                    const d = document.getElementById(ID) as HTMLInputElement;
                    const password = d.value;

                    if (password) {
                        close();
                        resolve(password);
                    } else {
                        message.error(language.getLangAsync("system", "file.download.confirm.require"));
                    }
                },
                onCancel: () => {
                    resolve("");
                },
                okType: "primary",
            });
        });
    }
}

export default new FileService();
