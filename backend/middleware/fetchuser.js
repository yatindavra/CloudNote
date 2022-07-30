var jwt = require('jsonwebtoken');
const JWT_SECRET = 'yatinDavrauu';

const fetchuser = (req, res, next) => {
//get User From JWT Token
const token = req.header("auth-token")
if (!token) {
    res.status(401).send({error:"please authenticate using valid token"})
}
try {
const data = jwt.verify(token,JWT_SECRET);
req.user = data.user;
next();
} catch (error) {
    res.status(401).send({error:"please authenticate using valid vvvvtoken"})
}}
module.exports = fetchuser;