const uuid = require('uuid');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var agreementId = uuid();

    if (req.query.name || (req.body && req.body.name)) {
        req.body.PartitionKey = agreementId + "Agreement";
        req.body.Id = agreementId;
        context.bindings.outputDocument = req.body;
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};