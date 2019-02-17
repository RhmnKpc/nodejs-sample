let jwt = require('jsonwebtoken');
const config = require('config.js');
const securityExceptionHandler = require('../SecurityExceptionHandler')

async function doFilter(req, res, next) {
    let token = getJwtToken(req);

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                securityExceptionHandler.accessDenied(res);
            } else {
                req.decoded = decoded;//todo it isn't necessary
                next();
            }
        });
    } else {
        securityExceptionHandler.accessDenied(res);
    }
};

function getJwtToken(req){
    let token = req.headers['x-auth-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
    }
    return token;
}//end getJwtToken

module.exports = {
    doFilter: doFilter
};
