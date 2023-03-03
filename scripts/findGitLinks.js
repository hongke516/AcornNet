const path = require('path');
const fs = require('fs');
const mapDirsFileDepth = require('./mapDirsFileDepth');
const { codeDir } = require('./config')
const ROOT = path.join(__dirname, codeDir);

const files = mapDirsFileDepth(ROOT, true, [ /node_modules/ ]).filter(item => {
    return item.endsWith('package.json');
}).filter(item => {
    const str = fs.readFileSync(item, 'utf-8');
    return /git\+(ssh|http)/igm.test(str);
});
console.info('files:', files);