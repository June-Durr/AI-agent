#!/bin/bash

# Get your AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="us-east-1"

# Package the Lambda function
cd lambda
zip -r ../function.zip quickAnalysis.js
cd ..
zip -r function.zip node_modules

# Create Lambda function
aws lambda create-function \
  --function-name mep-survey-analyzer \
  --runtime nodejs18.x \
  --role arn:aws:iam::${ACCOUNT_ID}:role/mep-survey-lambda-role \
  --handler quickAnalysis.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 512 \
  --region ${REGION}

echo "Lambda function created successfully"