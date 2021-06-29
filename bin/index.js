#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const axios = require("axios");
require('dotenv').config()

const AUTHORS = JSON.parse(process.env.GITHUB_AUTHORS);
const REPOS = JSON.parse(process.env.GITHUB_REPOS);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_BASE_URL = process.env.GITHUB_BASE_URL;

console.log(AUTHORS);
console.log(REPOS);
console.log(GITHUB_TOKEN);
console.log(GITHUB_BASE_URL);

const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv;

const greeting = chalk.white.bold(`Hello, ${options.name}!`);

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};
const msgBox = boxen( greeting, boxenOptions );

console.log(msgBox);

console.log("Here's a random joke for you:");

const url = "https://icanhazdadjoke.com/";

axios.get(url, { headers: { Accept: "application/json" } })
 .then(res => {
   console.log(res.data.joke);
 });