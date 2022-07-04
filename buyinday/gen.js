var path = require('path');
var fs = require('fs-extra');

var distPath = path.resolve(process.cwd(), './dist');

fs.moveSync(`${distPath}/model-buyinday/index.html`, `${distPath}/model-buyinday.html`);
// fs.moveSync(`${distPath}/static/x`, `${distPath}/x`);