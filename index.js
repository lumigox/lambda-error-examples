//https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html
const AWS = require('aws-sdk');
const config = require('./config.json');

const veryLargeString = (length = 6291456) => {
    let str = '';

    for (let i = 0; i < length; i++) {
        str = str + 'a';
    }

    return str;
}

const veryLargeJson = () => {
    return JSON.stringify({
        veryLargeString: veryLargeString()
    });
}
    
exports.handler = (event, context, callback) => {
    AWS.config.update({region: config.region});
    var lambda = new AWS.Lambda();

    let params = {
        FunctionName: 'lambda-error-success'
    }

    let index = 0;

    const functions = [
        {functionName: 'lambda-error-success'},
        {functionName: 'lambda-error-callback-with-error'}, 
        {functionName: 'lambda-error-callback-with-text'}, 
        {functionName: 'lambda-error-max-call-stack'},
        {functionName: 'lambda-error-syntax-error'}, 
        {functionName: 'lambda-error-throw'}, 
        {functionName: 'lambda-error-throttled'}, 
        {functionName: 'lambda-error-timeout'}, 
        {functionName: 'lambda-error-not-found'}, 
        {functionName: 'lambda-error-out-of-memory'},
        {functionName: 'lambda-error-request-body-too-large', payload: veryLargeJson()},
        {functionName: 'lambda-error-request-body-is-not-a-json', payload: 'a'}, 
        {functionName: 5}
    ];

    console.log('-------------------------------------------');
        
    const functionCallback = (err, data) => {
        if (err)  console.error(params.FunctionName, 'error', JSON.stringify(err,  null, 2));
        if (data) console.log(  params.FunctionName, 'data',  JSON.stringify(data, null, 2));

        console.log('-------------------------------------------');
        index++;
        if (index >= functions.length) return callback(null, 'END');

        let functionInfo = functions[index];
        params.FunctionName = functionInfo.functionName;
        if (functionInfo.payload) {
            params.Payload = functionInfo.payload;
        }
        lambda.invoke(params, functionCallback);
    }

    lambda.invoke(params, functionCallback);
}

