var path = require('path');
var fs = require('fs-extra');

var distPath = path.resolve(process.cwd(), './dist');

fs.moveSync(`${distPath}/model-5g/index.html`, `${distPath}/index.html`);
// fs.moveSync(`${distPath}/static/x`, `${distPath}/x`);