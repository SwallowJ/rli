import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";
import React, { useMemo } from "react";
import langservice from "@/common/core/language";

interface passwordProps {
    label?: string;
    name?: string;
    depends?: string;
}

export const PasswordForm: React.FC<passwordProps> = ({ depends, label, name = "newPassword" }) => {
    const [lang] = langservice.useLanguage("component");
    const rules = useMemo<Rule[]>(
        () => [
            { required: true },
            { min: 8, max: 20, message: lang("password.length") },
            { pattern: /^[A-Za-z0-9—!@#$%^&*?\-_]+$/, message: lang("password.illegal") },
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

                        reject(lang("password.rule"));
                    });
                },
            },
        ],
        []
    );

    return (
        <>
            <Form.Item
                name={name}
                hasFeedback={true}
                validateFirst={true}
                label={lang(label ?? "password.new")}
                dependencies={depends ? [depends] : undefined}
                rules={[
                    ...rules,
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (depends && value === getFieldValue(depends)) {
                                return Promise.reject(lang("password.new.same"));
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input.Password placeholder={lang("password.placeholder")} />
            </Form.Item>
            <Form.Item
                hasFeedback={true}
                validateFirst={true}
                dependencies={[name]}
                name={"confirmPassword"}
                label={lang("password.confirm")}
                rules={[
                    ...rules,
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue(name) === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(lang("password.confirm.inconsistent"));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder={lang("password.placeholder.confirm")} />
            </Form.Item>
        </>
    );
};
