const aws = require('aws-sdk');

const TodosTableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const id = event.pathParameters.id;

  const todo = await deleteTodo(id);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT"
    }
  };
};

async function deleteTodo(id) {
  const params = {
    TableName: TodosTableName,
    Key: {
      id: id
    }
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    const result = await dynamoDB.delete(params).promise();
    return result.Item;
  } catch (error) {
    console.log('Failed to get todo with id "' + id + '": ' + error);
    throw error;
  }
}
