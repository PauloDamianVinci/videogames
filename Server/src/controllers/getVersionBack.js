const packageJson = require('../../package.json');

const getVersionBack = async (req, res) => {

    try {
        const version = packageJson.version;
        console.log("getVersionBack ", version);
        return res.status(200).json({ version: version });
    } catch (err) {
        console.log("ERROR-> ", err.message);
        return res.status(err.response.status).send(err.message);
    }
};
module.exports = getVersionBack;
