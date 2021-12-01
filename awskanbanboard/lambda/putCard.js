var AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log("Received: " + JSON.stringify(event));

    try {
        const body = JSON.parse(event.body);
        const id = event.pathParameters.id;
        var params = {
            TableName: 'Cards',
            Key: { id : id },
            UpdateExpression: 'set #c = :c, #t = :t',
            ExpressionAttributeNames: {'#c' : 'category', '#t': 'title'},
            ExpressionAttributeValues: {
              ':c' : body.category,
              ':t' : body.title
            }
          };
        
        var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        await documentClient.update(params).promise();
        
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