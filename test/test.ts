import fs from "fs";

const obj = "/home/daisy/frontend/rli/config/config.ts";

if (fs.existsSync(obj)) {
    const src = require(obj);

    console.log(src);
}

try {
} catch (error) {}
