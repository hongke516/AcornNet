const path = require('path');
const fs = require('fs');

function mapDirsFileDepth(rootPath, deep = false, ignores, cb) {
    if (fs.existsSync(rootPath)) {
        const stat = fs.statSync(rootPath);
        if (cb) {
            const result = cb(rootPath, stat);
            if (result !== false) {
                return result;
            };
        }
        if (stat.isDirectory()) {
            const fileList = fs.readdirSync(rootPath);
            return fileList.reduce((arr, file) => {
                if (Array.isArray(ignores)) {
                    if (ignores.some(ignore => {
                        if (ignore instanceof RegExp) {
                            return ignore.test(file);
                        } else if (ignore.includes(file) || ignore === file) {
                            return true;
                        }
                        return false;
                    })) {
                        return arr;
                    }
                }
                return Array.prototype.concat.call(arr, mapDirsFileDepth(path.join(rootPath, file), deep, ignores, cb));
            }, []);
        } else if (stat.isFile()) {
            return rootPath;
        }
    }
    return [];
};

module.exports = mapDirsFileDepth;