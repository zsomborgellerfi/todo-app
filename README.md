# Serverless Todo App with AWS Lambda and React.js

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Deployment

Set REGION and S3_BUCKET variables in api/deploy.sh and connect to your AWS instance using CLi.

Next, change to the directory `todo-app` in the terminal and deploy the application:

```
bash deploy.sh <STAGE_NAME>
```

Replace `<STAGE_NAME>` with some unique value, e.g. your username.

The script prints out the URL of the API Gateway you can use for testing the application.

Now the application should be deployed to the AWS account. The corresponding stack is now visible in the Cloudformation console. It should be called `todo-app-<STAGE_NAME>`.

### Connect to your API

Set API_URL variable in frontend/lib/constants.js to your REST API's url.
