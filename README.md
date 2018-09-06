# Lambda Invocation Error Handling with AWS-SDK for Javascript

## Description
The purpose of this code is to simulate several of the more common errors that we can get, while invoking a Lambda function with AWS-SDK.

## Installation instructions

```sh
# Deploy the Lambda functions  
# IMPORTANT: This runs on the us-east-2 region. To change it go to the serverless.yml line 5 and to the config.json  
$ sls deploy  
# For throttle error, in AWS console, Lambda configuration of lambda-error-throttled, change the Concurrency to Reserve concurrency 0.  
# sls cannot set this value because this function will always throttled which usually does not make sence, but it is exactly what we want here.
# install node modules  
$ npm i  
# run the code  
$ node test.js  
```

## Output
The output should look something like this:
```js
-------------------------------------------
lambda-error-success data {
  "StatusCode": 200,
  "ExecutedVersion": "$LATEST",
  "Payload": "\"Hello from Lambda\""
}
-------------------------------------------
lambda-error-callback-with-error data {
  "StatusCode": 200,
  "FunctionError": "Handled",
  "ExecutedVersion": "$LATEST",
  "Payload": "{\"errorMessage\":\"an error occurred.\",\"errorType\":\"Error\",\"stackTrace\":[\"exports.handler (/var/task/index.js:3:14)\"]}"
}
-------------------------------------------
lambda-error-callback-with-text data {
  "StatusCode": 200,
  "FunctionError": "Handled",
  "ExecutedVersion": "$LATEST",
  "Payload": "{\"errorMessage\":\"an error occurred\"}"
}
-------------------------------------------
lambda-error-max-call-stack data {
  "StatusCode": 200,
  "FunctionError": "Unhandled",
  "ExecutedVersion": "$LATEST",
  "Payload": "{\"errorMessage\":\"RequestId: 88e9cf7e-89aa-11e8-8a9a-6d1e6b337909 Process exited before completing request\"}"
}
-------------------------------------------
lambda-error-syntax-error data {
  "StatusCode": 200,
  "FunctionError": "Unhandled",
  "ExecutedVersion": "$LATEST",
  "Payload": "{\"errorMessage\":\"Unexpected token )\",\"errorType\":\"SyntaxError\",\"stackTrace\":[\" ^\",\"SyntaxError: Unexpected token )\",\"createScript (vm.js:56:10)\",\"Object.runInThisContext (vm.js:97:10)\",\"Module._compile (module.js:542:28)\",\"Object.Module._extensions..js (module.js:579:10)\",\"Module.load (module.js:487:32)\",\"tryModuleLoad (module.js:446:12)\",\"Function.Module._load (module.js:438:3)\",\"Module.require (module.js:497:17)\",\"require (internal/module.js:20:19)\"]}"
}
-------------------------------------------
lambda-error-throw data {
  "StatusCode": 200,
  "FunctionError": "Unhandled",
  "ExecutedVersion": "$LATEST",
  "Payload": "{\"errorMessage\":\"RequestId: 89b97b79-89aa-11e8-b8ce-2981c530381f Process exited before completing request\"}"
}
-------------------------------------------
lambda-error-throttled error {
  "message": "Rate Exceeded.",
  "code": "TooManyRequestsException",
  "time": "2018-07-17T10:16:58.928Z",
  "requestId": "8a1493b8-89aa-11e8-bac1-0332183f9d53",
  "statusCode": 429,
  "retryable": false,
  "retryDelay": 30.032524789931546
}
-------------------------------------------
lambda-error-timeout data {
  "StatusCode": 200,
  "FunctionError": "Unhandled",
  "ExecutedVersion": "$LATEST",
  "Payload": "{\"errorMessage\":\"2018-07-17T10:17:00.383Z 8a3d29ff-89aa-11e8-a040-2759dd9dfff0 Task timed out after 1.00 seconds\"}"
}
-------------------------------------------
lambda-error-not-found error {
  "message": "Function not found: arn:aws:lambda:eu-central-1:230869179848:function:lambda-error-not-found",
  "code": "ResourceNotFoundException",
  "time": "2018-07-17T10:17:00.998Z",
  "requestId": "8b50bd0a-89aa-11e8-a352-3fc5bb8089c5",
  "statusCode": 404,
  "retryable": false,
  "retryDelay": 85.63720462564623
}
-------------------------------------------
lambda-error-out-of-memory data {
  "StatusCode": 200,
  "FunctionError": "Unhandled",
  "ExecutedVersion": "$LATEST",
  "Payload": "{\"errorMessage\":\"RequestId: 8b79a262-89aa-11e8-ab30-15a994eaeaaf Process exited before completing request\"}"
}
-------------------------------------------
lambda-error-request-body-too-large error {
  "message": "6291478 byte payload is too large for the RequestResponse invocation type (limit 6291456 bytes)",
  "code": "RequestEntityTooLargeException",
  "time": "2018-07-17T10:17:27.611Z",
  "requestId": "9325be8f-89aa-11e8-830c-8d9629b96a57",
  "statusCode": 413,
  "retryable": false,
  "retryDelay": 71.57347410933622
}
-------------------------------------------
lambda-error-request-body-is-not-a-json error {
  "message": "Could not parse request body into json: Unrecognized token 'a': was expecting ('true', 'false' or 'null')\n at [Source: [B@29e283fa; line: 1, column: 3]",
  "code": "InvalidRequestContentException",
  "time": "2018-07-17T10:17:27.953Z",
  "requestId": "9b62a97b-89aa-11e8-8e90-9bc10da2e7b4",
  "statusCode": 400,
  "retryable": false,
  "retryDelay": 40.731695976026415
}
-------------------------------------------
5 error {
  "message": "Expected params.FunctionName to be a string",
  "code": "InvalidParameterType",
  "time": "2018-07-17T10:17:27.963Z"
}
-------------------------------------------

Object {result: ""END""}
```

## References
[Invoke - AWS Lambda - AWS Documentation](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html)  
[AWS Lambda Limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html)  
[Best Practices for Working with AWS Lambda Functions](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)  
