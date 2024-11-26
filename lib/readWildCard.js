const fs = require('fs');
const yaml = require('yaml');
const pathLib = require('path');
const deepmerge = require('deepmerge');
const wcmatch = require('wildcard-match');

let getFilesByPattern = (wildPath) => {
    try {
        let path = pathLib.dirname(wildPath);
        let files = fs.readdirSync(path);
        const isMatch = wcmatch(pathLib.basename(wildPath))
        return files.filter(file => isMatch(file));
    } catch (e) {
        return [];
    }
}

let read = (wildPath) => {
    let files = getFilesByPattern(wildPath);
    let root = pathLib.dirname(wildPath);
    let config = {};

    files.forEach((file) => {
        try {
            let filename = `${root}/${file}`;
            let content = yaml.parse(fs.readFileSync(filename, 'utf8'));
            config = deepmerge(config, content);
            console.log('[YMLConf] apply config', filename);
        } catch (e) {
            console.warn(`[YMLConf] the file "${file}" was not parsed`);
        }
    });
    return config;
}

module.exports = read;
