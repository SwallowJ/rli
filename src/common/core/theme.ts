/**
 * Author        jfh
 * Date          2021-07-19
 * email         feihongjiang@caih.com
 * Description   主题管理工具
 */

export const loadTheme = () => {
    const theme = "default";
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet/less");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", `/theme/${theme}.less`);

    document.head.appendChild(link);
};
