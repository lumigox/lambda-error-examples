const index = require('.');

const event = {};
const context = {};

index.handler(event, context, (err, data)=>{
    if (err) console.error(err);
    else console.log({result:JSON.stringify(data)});
});