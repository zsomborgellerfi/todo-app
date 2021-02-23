const aws = require('aws-sdk');

const TodosTableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const todos = await listTodos();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT"
    },
    body: JSON.stringify(todos, null, 2)
  };
};

async function listTodos() {
  const params = {
    TableName: TodosTableName
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    const results = await dynamoDB.scan(params).promise();
    return results.Items;
  } catch (error) {
    console.log('Failed to fetch todos: ' + error);
    throw error;
  }
}
