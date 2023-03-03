const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '../');
const MAIN_ROOT = path.join(ROOT, 'micro-app');
console.log(ROOT, 'Rootaa')

const cp = require('child_process');
const { getCurrentUser } = require('./utils');
function runCmd(cmd) {
    // 增加权限检查逻辑 start
    const user = getCurrentUser();
    if (user.isNotAuth()) {
        return;
    }
    // 增加权限检查逻辑 end
    return cp.execSync(cmd, {
        cwd: MAIN_ROOT,
        stdio: 'inherit',
    });
}

if (!fs.existsSync(path.join(MAIN_ROOT, 'node_modules'))) {

    // install
    runCmd('yarn');

    // build client
    runCmd('yarn build');

}

