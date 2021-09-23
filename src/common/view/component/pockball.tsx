import { Dispatch } from "redux";
import styles from "./style.less";
import { connect } from "react-redux";
import storage from "@/common/core/storage";
import { Menu, Dropdown } from "@/component";
import { namespace } from "@/models/language";
import langservice from "@/common/core/language";
import React, { DragEvent, useMemo, useRef, useState } from "react";

interface locationType {
    x: number;
    y: number;
}

const _KEY = "POCKBALL";

interface pockBallProps {
    dispatch: Dispatch;
    lang?: Global.LANGUAGE.Type;
}

export const pockBall: React.FC<pockBallProps> = ({ lang = "zh_CN", dispatch }) => {
    const ball = useRef<HTMLDivElement>(null);
    const [dev] = langservice.useLanguage("dev");
    const [configVisible, setConfigVisible] = useState(false);

    const _init = useMemo<React.CSSProperties>(() => {
        const location = storage.local.getObj<locationType>(_KEY);
        return { left: `${location?.x ?? 10}px`, top: location?.y ? `${location.y}px` : "75%" };
    }, []);

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const x = e.clientX - 25;
        const y = e.clientY - 25;
        ball.current?.setAttribute("style", `left: ${x}px; top: ${y}px; opacity: 0.8`);
        storage.local.saveObj(_KEY, { x, y });
    };

    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
        ball.current?.setAttribute("style", `left: ${e.clientX - 25}px; top: ${e.clientY - 25}px; opacity: 0.3`);
    };

    const showConfig = () => {
        setConfigVisible(true);
    };

    const hiddenConfig = (visible: boolean) => {
        visible || setConfigVisible(visible);
    };

    const changeLanguage = (l: Global.LANGUAGE.Type) => {
        dispatch({ type: `${namespace}/changeLanguage`, lang: l });
    };

    return (
        <Dropdown
            trigger={["click"]}
            placement={"topRight"}
            visible={configVisible}
            onVisibleChange={hiddenConfig}
            overlay={
                <Menu selectedKeys={[lang]}>
                    <Menu.SubMenu title={dev("language")}>
                        {langservice.langlist.map((l) => (
                            <Menu.Item onClick={changeLanguage.bind(null, l)} key={l}>
                                {l}
                            </Menu.Item>
                        ))}
                    </Menu.SubMenu>
                </Menu>
            }
        >
            <div
                ref={ball}
                style={_init}
                draggable={true}
                onDragEnd={onDrop}
                onDragStart={onDragStart}
                className={styles.PockBall}
            >
                <div className={styles.config} onClick={showConfig}>
                    {dev("config")}
                </div>
                <div className={styles.monitor}></div>
            </div>
        </Dropdown>
    );
};

export const PockBall = connect(({ [namespace]: { lang } }: { [namespace]: Global.LANGUAGE.StateType }) => ({ lang }))(
    pockBall
);
