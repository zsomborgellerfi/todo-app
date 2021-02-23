const aws = require('aws-sdk');
const uuid = require('uuid/v4');

const TodosTableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const hostname = event.headers.Host;
  const path = event.requestContext.path;

  let todo = JSON.parse(event.body);
  // Generate a unique ID for the new todo
  todo.id = uuid();
  // All new todos are not checked when they are created
  todo.checked = false;

  await createTodo(todo);
  return {
    statusCode: 201,
    headers: {
      'Location': `https://${hostname}${path}${todo.id}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT"
    }
  };
};

async function createTodo(todo) {
  const params = {
    TableName: TodosTableName,
    Item: todo
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    console.log('Failed to save todo: ' + error);
    throw error;
  }
}
