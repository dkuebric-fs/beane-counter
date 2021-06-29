const axios = require('axios').default;
const dotenv = require('dotenv');

dotenv.config()
//console.log(process.env.GITHUB_BASE_URL);
module.exports = {
    client: axios.create({
        baseURL: `${process.env.GITHUB_BASE_URL}`,
        headers: {
            'user-agent': 'node.js',
            Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
        }
    )
}
