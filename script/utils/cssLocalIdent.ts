/**
 * Author        jiangfh
 * Date          2021-05-08
 * email         feihongjiang@caih.com
 * Description   css命名添加前缀、hash
 */

import path from "path";
import loaderUtils from "loader-utils";

export const getLocalIdent = (context: any, localIdentName: string, localName: Buffer, options: any) => {
    const fileNameOrFolder = "[folder]";

    const hash = loaderUtils.getHashDigest(
        //@ts-ignore
        path.posix.relative(context.rootContext, context.resourcePath) + localName,
        "md5",
        "base64",
        6
    );

    const className = loaderUtils.interpolateName(context, fileNameOrFolder + "_" + localName + "__" + hash, options);

    return className.replace(".module_", "_");
};
