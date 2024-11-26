const fs = require('fs');

let check = (dirname) => {
    try {
        fs.accessSync(dirname, fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = check;
