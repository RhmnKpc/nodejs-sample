const config = require('config.js');
const securityExceptionHandler = require('../SecurityExceptionHandler')

async function doFilter(req, res, next) {
    let xApiKey = getApiKey(req);
    if (xApiKey && (xApiKey === config.appApiKey)) {
        next();
    } else {
        securityExceptionHandler.accessDenied(res);
    }
};//end apiKeyFillter

function getApiKey(req){
    return req.headers['x-api-key'];
}

module.exports = {
    doFilter: doFilter
}