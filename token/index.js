var azureJWT = require('azure-jwt-verify');

module.exports = async function (context, req) {

    var jwtToken = req.body.token;
    const config = {
        JWK_URI: `https://login.microsoftonline.com/${process.env["TenantId"]}/discovery/v2.0/keys`,
        ISS: `https://login.microsoftonline.com/${process.env["TenantId"]}/v2.0`,
        AUD: process.env["AUD"]
    };
    
    var decodedToken = await azureJWT.verify(jwtToken, config);
    
    context.res = {
        body:  decodedToken,
        headers: {
            'Content-Type': 'application/json'
        }
    };
};