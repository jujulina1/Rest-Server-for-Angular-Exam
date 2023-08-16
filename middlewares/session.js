//Create session

const { parseToken } = require("../services/userService")

module.exports = () => (req, res, next) => {

    const token = req.headers['x-authorization']//undefined

    try {
        if (token) {
            const payload = parseToken(token);
            req.user = payload;
            req.token = token;
        } else {
            req.token = token
        }


    } catch (error) {


        return res.status(401).json({ message: 'Invalid authorization token' })
    }

    next();
}