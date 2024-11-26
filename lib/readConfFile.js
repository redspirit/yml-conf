const fs = require('fs');
const yaml = require('yaml');

let read = (filename) => {
    let config = {};
    try {
        if(fs.existsSync(filename)) {
            config = yaml.parse(fs.readFileSync(filename, 'utf8'));
            console.log('[YMLConf] apply config', filename);
        }
    } catch(e) {
        console.warn(`[YMLConf] ${filename} was not found or parsed!`);
    }
    return config;
}

module.exports = read;
