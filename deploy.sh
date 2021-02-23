#!/bin/bash

if [ -z "$1" ]
then
  echo "Parameter is missing. Please provide the name of the stage like"
  echo "  bash deploy.sh dev"
  exit
fi

REGION=eu-west-1
S3_BUCKET=todo-app-sam-deploy-$REGION
INPUT_FILE=sam-template.yaml
OUTPUT_FILE=sam-template-output.yaml
STAGE_NAME=$1
STACK_NAME=todo-app-$STAGE_NAME

basePath=$(pwd)

cd $basePath/api/src
for d in *; do
    if [[ -d $d ]]; then
        cd "$d"
        echo "Building $d..."
        npm install --silent
        cd ..
    fi
done
cd $basePath

aws cloudformation package --template-file $INPUT_FILE --output-template-file $OUTPUT_FILE --s3-bucket $S3_BUCKET --region $REGION
aws cloudformation deploy --template-file $OUTPUT_FILE --stack-name $STACK_NAME --parameter-overrides StageName=$STAGE_NAME --capabilities CAPABILITY_IAM --region $REGION

API_GATEWAY_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].Outputs[?OutputKey == 'ApiUrl'].OutputValue')

echo " API_GATEWAY_URL:  $API_GATEWAY_URL"

length=${#API_GATEWAY_URL}
API_GATEWAY_URL=${API_GATEWAY_URL:1:$length-2}

echo
echo "API Gateway URL: $API_GATEWAY_URL"
echo "Get all the todos:"
echo "  curl -i $API_GATEWAY_URL/todos"

cd frontend
npm install 
npm run build
cd ..
BUCKET=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey == 'WebappBucket'].OutputValue" --output text)
aws s3 sync --delete --exact-timestamps frontend/build/ s3://${BUCKET}
aws s3 cp frontend/build/index.html s3://${BUCKET}/index.html

CFURL=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey == 'WebUrl'].OutputValue" --output text)
echo "Website is available under: ${CFURL}"
