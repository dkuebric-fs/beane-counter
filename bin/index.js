#!/usr/bin/env node

const yargs = require('yargs');
const { gitHubIssuesSearchApi } = require("../src/api/gitHubIssuesSearchApi");
const dotenv = require('dotenv');

dotenv.config()

const AUTHORS = JSON.parse(process.env.GITHUB_AUTHORS);
const REPOS = JSON.parse(process.env.GITHUB_REPOS);

const options = yargs
 .usage("Usage: -a <author>")
 .option("a", { alias: "author", choices: AUTHORS, describe: "GitHub Author", type: "string", demandOption: true })
 .argv;

console.log(`Searching PRs for ${options.author}`);

gitHubIssuesSearchApi(options.author);
