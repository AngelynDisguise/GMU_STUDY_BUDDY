const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.headers['accessToken'];
    if (!accessToken) {
        return res.json({ error: 'User is not logged in' });
    }

    try {
        const validToken = verify(accessToken, process.env.SECRET_KEY);
        if (validToken) {
            return next();
        }
    } catch (err) { //also could be a json error message
        return res.json({ error: err });
    }
};

module.exports = { validateToken };



// const validateToken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }