exports.handler = (event, context, callback) => {
    // sleep time expects milliseconds
    var sleep = function(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    var milliseconds = event.milliseconds || 60 * 1000; // default minute
    
    sleep(milliseconds).then(() => {
        callback(null, "sleeped for " + milliseconds + " milliseconds");
    });
};