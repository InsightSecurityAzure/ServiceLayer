var azureJWT = requre('azure-jwt-verify');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var jwtToken = "YOUR_JWT_TOKEN_TO_VERIFY"; // You can find this url in Azure Active Directory B2C Section
    const config = {
        JWK_URI: "https://login.microsoftonline.com/common/discovery/v2.0/keys",
        ISS: "https://login.microsoftonline.com/ed621573-af77-49f0-9494-e02cffcdbb4a/v2.0",
        AUD: "e01d7f67-1abd-4f1b-8d04-ab59058a75e8"
    };

    if (req.query.name || (req.body && req.body.name)) {
        azureJWT.verify(jwtToken, config).then(function(decoded){
             console.log(decoded) 
            }, function(error){

            })
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
};