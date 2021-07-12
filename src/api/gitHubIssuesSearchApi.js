const github = require('./github.js');
const chalk = require("chalk");
const { calcDaysBetween } = require("../utility/calcDaysBetween");

const gitHubIssuesSearchApi = async (author) => {
    try {
        const authored = await github.client.get(`search/issues?q=author:${author}&sort:updated-des`);
        const commeted = await github.client.get(`search/issues?q=commenter:${author}&sort:updated-des`);

        const authoredHeader = chalk.green.bold("Last 20 PRs Authored");
        const authoredPRsToPrint = authored.data.items.slice(0, 20).map(pr => `Created ${calcDaysBetween(pr.created_at)} days go, ${pr.comments} Comments, url: ${pr.html_url}`);
        console.log(authoredHeader);
        console.log(authoredPRsToPrint.join("\n"));

        console.log("\n");

        const commentedHeader = chalk.green.bold("Last 20 PRs Commented On");
        const commentedPRsToPrint = commeted.data.items.slice(0, 20).map(pr => `Updated ${calcDaysBetween(pr.updated_at)} days go, url -> ${pr.html_url}`);
        console.log(commentedHeader);
        console.log(commentedPRsToPrint.join("\n"));

    } catch (e) {
        console.log(e);
    }
};

exports.gitHubIssuesSearchApi = gitHubIssuesSearchApi;
