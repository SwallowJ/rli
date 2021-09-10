import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";
import React, { useMemo } from "react";

interface passwordProps {
    depends?: string;
}

export const PasswordForm: React.FC<passwordProps> = ({ depends }) => {
    const rules = useMemo<Rule[]>(
        () => [
            { required: true, message: "请输入密码" },
            { min: 8, max: 20, message: "密码长度在8~20位" },
            { pattern: /^[A-Za-z0-9—!@#$%^&*?\-_]+$/, message: "存在非法字符" },
            {
                validator: (_, value) => {
                    return new Promise((resolve, reject) => {
                        if (!value) {
                            resolve("");
                        }
                        const count: string[] = [];
                        for (let i = 0; i < value.length; i++) {
                            const d: string = value[i];

                            if ("0" <= d && d <= "9" && !count.includes("n")) {
                                count.push("n");
                            } else if ("a" <= d && d <= "z" && !count.includes("lp")) {
                                count.push("lp");
                            } else if ("A" <= d && d <= "Z" && !count.includes("up")) {
                                count.push("up");
                            } else if (
                                ["-", "—", "!", "@", "#", "$", "%", "^", "&", "*", "?", "_"].includes(d) &&
                                !count.includes("c")
                            ) {
                                count.push("c");
                            }

                            if (count.length > 1) {
                                resolve("");
                            }
                        }

                        reject("密码必须由大小写字母数字和特殊符号中的两种组合");
                    });
                },
            },
        ],
        []
    );

    return (
        <>
            <Form.Item
                label={"新的密码"}
                hasFeedback={true}
                validateFirst={true}
                name={"newPassword"}
                dependencies={depends ? [depends] : undefined}
                rules={[
                    ...rules,
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (depends && value === getFieldValue(depends)) {
                                return Promise.reject("新密码不能与旧密码一样");
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input.Password placeholder={"请输入新的密码"} />
            </Form.Item>
            <Form.Item
                label={"密码确认"}
                hasFeedback={true}
                validateFirst={true}
                dependencies={["newPassword"]}
                name={"confirmPassword"}
                rules={[
                    ...rules,
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("newPassword") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject("确认密码与新密码不一致!");
                        },
                    }),
                ]}
            >
                <Input.Password placeholder={"请输入确认密码"} />
            </Form.Item>
        </>
    );
};
