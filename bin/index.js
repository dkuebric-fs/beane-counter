#!/usr/bin/env node

const yargs = require('yargs');
const github = require('../src/api/github.js');
const dotenv = require('dotenv');

dotenv.config()

const AUTHORS = JSON.parse(process.env.GITHUB_AUTHORS);
const REPOS = JSON.parse(process.env.GITHUB_REPOS);

//console.log(AUTHORS);
//console.log(REPOS);

const options = yargs
 .usage("Usage: -a <author>")
 .option("a", { alias: "author", choices: AUTHORS, describe: "GitHub Author", type: "string", demandOption: true })
 .argv;

console.log(`Searching PRs for ${options.author}`);


const searchApi = async () => {
    try {
        const response = await github.client.get(`search/issues?q=author:${options.author}`);
    
        console.log(response.data.total_count); 
    } catch (e) {
        console.log(e);
    }
};

searchApi();

//export default () => {}