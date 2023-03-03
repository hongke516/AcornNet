const path = require('path');
const fs = require('fs');
const mapDirsFileDepth = require('./mapDirsFileDepth');
const { allModules } = require('../utils/constant');
const { codeDir } = require('./config')
const ROOT = path.join(__dirname, codeDir);



function findAllPackage(projectName) {
    if (!projectName) {
        return [];
    }
    const filePath = path.join(ROOT, projectName)
    const files = mapDirsFileDepth(filePath, true, [ /node_modules/ ]).filter(item => {
        return item.endsWith('package.json');
    }).filter(item => {
        const str = fs.readFileSync(item, 'utf-8');
        return /git\+(ssh|http)/igm.test(str);
    });
    return files;
}

function replaceLinks(files) {
    const item = files[0]
    let str = fs.readFileSync(item, 'utf-8');
    let json = JSON.parse(str);
    const allModuleDepKeys = Object.keys(allModules).map(k => `@micro-app/${k}`);
    Object.keys(json.dependencies).forEach(dkey => {
        if (allModuleDepKeys.includes(dkey)) {
            console.log(dkey)
            const key = dkey.split('/')[1];
            json.dependencies[dkey] = `file:../micro-${key}`
        }
    })
    const replaced = JSON.stringify(json);
    fs.writeFileSync(item, replaced, 'utf-8');
    console.log('replace over:', files)
}
module.exports = {
    findAllPackage,
    replaceLinks
};