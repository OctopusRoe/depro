#!/usr/bin/env node

const createConfig = require('../scripts/createConfig')
const afterInstall = require('../scripts/installDone')

createConfig()

afterInstall()