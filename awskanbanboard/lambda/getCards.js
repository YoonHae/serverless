var AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log("Received: " + JSON.stringify(event));
    let response = {
            statusCode: 500,
            body: "internal Server Error"
        };

    try {
        var params = {
            TableName: "Cards"
        }
        
        var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        const cards = await documentClient.scan(params).promise();
        console.log("cards is " + JSON.stringify(cards));
        response.statusCode = 200;
        response.body = JSON.stringify(cards);
        return response;
    }catch(exception) {
        console.log(exception)
        return response;
    }
};