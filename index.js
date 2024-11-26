const deepmerge = require('deepmerge');
let checkDir = require('./lib/checkDir')
let readWildCard = require('./lib/readWildCard')
let readConfFile = require('./lib/readConfFile')
let argv = require('minimist')(process.argv.slice(2));
const envData = process.env;
let confName = argv.conf || argv.config || envData['USE_CONFIG'] || null;

const root = process.cwd() + '/config'; // path of configs files
const DOCKER_OLD = '/docker_config';
const DOCKER_FILES = '/config/*';
const USER_FILES = '/.*.yml';

if(!checkDir(root)) {
    module.exports = {};
    return console.error('[YMLConf] directory /config not found!');
}

let config = readConfFile(root + '/base.yml');
if(confName === 'dev') {
    config = deepmerge(config, readConfFile(root + '/dev.yml'));
} else if (confName === 'prod') {
    config = deepmerge(config, readConfFile(root + '/prod.yml'));
} else if (!confName) {
    config = deepmerge(config, readWildCard(root + USER_FILES));
}

config = deepmerge(config, readConfFile(DOCKER_OLD));
config = deepmerge(config, readWildCard(DOCKER_FILES));

module.exports = config;
