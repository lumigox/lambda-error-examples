exports.handler = (event, context, callback) => {
    // TODO implement
    let a = [];
    
    while (true) a.push({a:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'});
    callback(null, 'Hello from Lambda');
};