const { User } = require('../DB_connection');

const postUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("postUser ", email, ", ", password);
    try {
        if (!email || !password) return res.status(400).send("Data missing");
        const newUser = await User.findOrCreate({
            where: { email: email, password: password },
            defaults: {
                email, password
            }
        });
        return res.status(200).json(newUser);
    } catch (err) {
        console.log("ERROR-> ", err.message);
        return res.status(500).send(err.message);
    }
}
module.exports = postUser;