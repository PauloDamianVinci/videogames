// Se obtiene la versión del programa.
const packageJson = require('../../package.json');
const showLog = require("../functions/showLog");

const getVersionBack = async (req, res) => {
    try {
        const version = packageJson.version;
        showLog("getVersionBack ", version);
        return res.status(200).json({ version: version });
    } catch (err) {
        showLog(`getVersionBack ERROR-> ${err.message}`);
        return res.status(err.response.status).send(err.message);
    }
};
module.exports = getVersionBack;
