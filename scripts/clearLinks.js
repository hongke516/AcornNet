const path = require('path');
const mapDirsFileDepth = require('./mapDirsFileDepth');
const cp = require('child_process');
const { getCurrentUser } = require('./utils');

const ROOT = path.join(__dirname, '../');
function runCmd(cmd) {
    console.info('[cmd]', cmd);
    // 增加权限检查逻辑 start
    const user = getCurrentUser();
    if (user.isNotAuth()) {
        return;
    }
    // 增加权限检查逻辑 end
    return cp.execSync(cmd, {
        encoding: 'utf-8',
        cwd: ROOT,
        stdio: 'inherit',
    });
}

const files = mapDirsFileDepth(ROOT, true, false, (p, stat) => {
    if (stat.isDirectory()) {
        if (p.endsWith('node_modules') || p.endsWith('.git')) {
            return p;
        }
        return false;
    }
    return [];
});
console.info('files:', files);

files.map(file => {
    return 'rm -rf ' + path.relative(ROOT, file);
}).forEach(cmd => {
    const r = runCmd(cmd);
    r && console.info(r);
});
