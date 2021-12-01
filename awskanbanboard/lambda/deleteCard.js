var AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        const id = event.pathParameters.id;
        var params = {
            TableName: 'Cards',
            Key: { id : id }
          };
        
        var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        await documentClient.delete(params).promise();
        
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