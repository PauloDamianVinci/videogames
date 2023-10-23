const { User } = require('../DB_connection');

const login = async (req, res) => {
    const { email, password } = req.query;
    console.log("login ", email, ", ", password);
    try {
        if (!email || !password) return res.status(400).send("Data missing");
        const findUser = await User.findOne({
            where: { email: email },
        });
        if (!findUser) { return res.status(404).send("Not found"); };
        if (password !== findUser.password) { return res.status(403).send("Wrong password"); };
        return res.status(200).json({ access: true, id: findUser.id });
    } catch (err) {
        console.log("ERROR-> ", err.message);
        return res.status(500).send(err.message);
    }
};
module.exports = login;
