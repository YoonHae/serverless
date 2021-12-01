var AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log("Received: " + JSON.stringify(event));

    try {
        const id = event.requestContext.requestId
        const body = JSON.parse(event.body);
        body.id = id;

        var params = {
            TableName: "Cards",
            Item: body
        }
        
        var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        await documentClient.put(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({id: id})
        };
    }catch(exception) {
        console.log(exception)
        return {
            statusCode: 500,
            body: "internal Server Error"
        };
    }
};