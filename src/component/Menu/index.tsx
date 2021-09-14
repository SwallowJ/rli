import React from "react";
import { Menu, MenuProps, MenuItemProps, SubMenuProps } from "antd";

function menu(props: MenuProps) {
    return <Menu {...props} className={`xc-menu-${props.theme || "dark"} ${props.className || ""}`} />;
}

menu.TitleItem = (props: MenuItemProps) => {
    return <Menu.Item {...props} className={`xc-menu-item-title ${props.className || ""}`} />;
};

const SubMenu: React.FC<SubMenuProps> = (props) => (
    <Menu.SubMenu {...props} className={`xc-menu-sub ${props.className || ""}`} />
);

menu.Item = (props: MenuItemProps) => {
    return <Menu.Item {...props} className={`xc-menu-item ${props.className || ""}`} />;
};

menu.SubMenu = SubMenu;
export default menu;
