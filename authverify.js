const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token  = req.header("token");
    if (!token) {
        return res.status(401).json("Access Denied")
    }
    try {
        const verifyUser = jwt.verify(token, process.env.Token_Secret);
        req.user = verifyUser;
        next()
    } catch (error) {
        res.status(400).json("Invalid Token")
    }
}