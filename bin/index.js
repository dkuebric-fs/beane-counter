#!/usr/bin/env node

const yargs = require('yargs');
const github = require('../src/api/github.js');
const dotenv = require('dotenv');
const chalk = require("chalk");

dotenv.config()

const AUTHORS = JSON.parse(process.env.GITHUB_AUTHORS);
const REPOS = JSON.parse(process.env.GITHUB_REPOS);

const options = yargs
 .usage("Usage: -a <author>")
 .option("a", { alias: "author", choices: AUTHORS, describe: "GitHub Author", type: "string", demandOption: true })
 .argv;

console.log(`Searching PRs for ${options.author}`);


const searchApi = async () => {
    try {
        const authored = await github.client.get(`search/issues?q=author:${options.author}&sort:updated-des`);
        const commeted = await github.client.get(`search/issues?q=commenter:${options.author}&sort:updated-des`);

        const authoredHeader = chalk.green.bold("Last 20 PRs Authored!");
        const authoredPRsToPrint = authored.data.items.slice(0, 20).map(pr => `Created ${Math.round((new Date().getTime() - new Date(pr.created_at).getTime()) / (1000 * 3600 * 24))} days go, ${pr.comments} Comments, url: ${pr.html_url}`);
        console.log(authoredHeader); 
        console.log(authoredPRsToPrint.join("\n"));

        console.log("\n\n");

        const commentedHeader = chalk.green.bold("Last 20 PRs Commented On!");
        const commentedPRsToPrint = commeted.data.items.slice(0, 20).map(pr => `Updated ${Math.round((new Date().getTime() - new Date(pr.updated_at).getTime()) / (1000 * 3600 * 24))} days go, url -> ${pr.html_url}`);
        console.log(commentedHeader); 
        console.log(commentedPRsToPrint.join("\n"));

    } catch (e) {
        console.log(e);
    }
};

searchApi();