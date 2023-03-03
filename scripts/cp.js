const path = require('path');
const fs = require('fs');
const { codeDir, defaultCode } = require('./config')
const { getCurrentUser } = require('./utils');
const ROOT = path.join(__dirname, codeDir);
const defaultCodePath = path.join(__dirname, defaultCode);

const cp = require('child_process');
function cpFile(parentPath) {
    const filePath = path.join(ROOT, parentPath)
    if (!fs.existsSync(filePath)) {
        return;
    }
    const cmd = `cp -r ./* ${filePath}`;
    console.log(cmd)
    // 增加权限检查逻辑 start
    const user = getCurrentUser();
    if (user.isNotAuth()) {
        return;
    }
    // 增加权限检查逻辑 end
    return cp.execSync(cmd, {
        cwd: defaultCodePath,
        stdio: 'inherit',
    });
}

module.exports = {
    cpFile
};
