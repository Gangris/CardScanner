var https = require("https");
var config = require("./configuration.json");
var priv = require("./private.json");
var MongoClient = require("mongodb").MongoClient;

function startup() {
    startupCheckup();

    testConnectDB()
        .then(getBearerToken)
        .then(function(){
            if (config.application.pollNewCards.enabled)
                startPollNewCards();

            if (config.application.pollPriceUpdates.enabled)
                startPollPriceUpdates();
    })
    .catch(function(err){
        console.error(err);
    });
}

function startupCheckup() {
    if (!config)
        throw "configuration.json required for application";

    if (!config.db)
        throw "db must be configured in configuration.json";

    if (!config.application)
        throw "application must be configured in configuration.json";

    if (!priv)
        throw "private.json required for application";
}

function testConnectDB(){
    return new Promise((resolve, reject) => {
        MongoClient.connect(config.db.dbPath + config.db.databaseName, function(err, resp) {
            if (err)
                reject(err);

            resolve();
        });
    });
}

function getBearerToken() {
    return new Promise((resolve, reject) => {

    });
}

function startPollNewCards() {

}

function startPollPriceUpdates() {

}
