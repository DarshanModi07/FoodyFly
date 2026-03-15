const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "dist", "index.html");
let html = fs.readFileSync(htmlPath, "utf-8");

html = html.replace(/src=([^"'\s>]+\.js)/g, 'src="./$1"');
html = html.replace(/href=([^"'\s>]+\.css)/g, 'href="./$1"');

fs.writeFileSync(htmlPath, html);
console.log("✅ Fixed asset paths in dist/index.html");