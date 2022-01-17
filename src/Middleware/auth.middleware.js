const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'bookmyshowsecretclone';

const isAuthenticated = (req, res, next) => {
    const authToken = req.headers.authtoken;
    if (authToken === undefined) {
        res.status(401).json({
            statuscode: 401,
            message: 'please login again to continue'
        })
        return;
    }
    else {
        jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'session expired'
                })
                return;
            }
            else {
                res.locals.email = decoded.email;
                res.locals.userId = decoded.id;
                next();
            }
        })
    }
}

module.exports = isAuthenticated;