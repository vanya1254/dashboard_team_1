const local = require('./lib/local');
const server = require('./lib/server');
const yargs = require('yargs');
const { synchronize, synchronizeII, pullPushInit } = require('./lib/commands');
const env = yargs.argv.env ? yargs.argv.env : 'none';

local.setBaseDir(`dist_${env}`);
pullPushInit(() => synchronizeII(local, server));
