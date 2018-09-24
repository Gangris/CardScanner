var http = require("http");
var config = require("./configuration.json");
var priv = require("./private.json");
var MongoClient = require("mongodb").MongoClient;
var currentSession, lastCardPoll, lastPricePoll;

function startup() {
    startupCheckup();

    testConnectDB()
        .then(getBearerToken)
        .then(main)
        .catch(function(err){
            console.error(err);
        });
}

// Application loop
function main() {
    var promises = [];
    if (config.application.pollNewCards.enabled)
        promises.push(pollNewCards());

    if (config.application.pollPriceUpdates.enabled)
        promises.push(pollPriceUpdates());

    Promise.all(promises)
        .then(setTimeout(main, config.application.internalClock))
        .catch(function(err){
            console.error(err);
        })
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

// Just to test to see if the application can reach the mongo database
function testConnectDB(){
    return new Promise((resolve, reject) => {
        console.log("testConnectDB Start.");
        MongoClient.connect(config.db.dbPath + config.db.databaseName, function(err, db) {
            if (err)
                reject(err);

            console.log("testConnectDB Success!");
            db.close();
            resolve();
        });
    });
}

function getBearerToken() {
    return new Promise((resolve, reject) => {
        console.log("Start getBearerToken");

        if(!currentSession){
            console.log("No current Session.");
            getLocalSession()
                .then(function(session){
                    if(!session)
                    {
                        console.log("No valid local session found.");
                        getRemoteSession()
                            .then(function(session){
                                currentSession = session;
                                resolve();
                            })
                            .catch(function(err){
                                reject(err);
                            });
                    } else {
                        console.log("Local session found.");
                        currentSession = session;
                        resolve();
                    }
                })
                .catch(function(err){
                    reject(err);
                });
        } else {
            getRemoteSession()
                .then(function(session){
                    currentSession = session;
                })
                .catch(function(err){
                    reject(err);
                });
        }
    });
}

function testSession() {
    return new Promise((resolve, reject) => {
        if(currentSession.expires <= Date.now()) {
            currentSession = null;
        }

        if(!currentSession) {
            getBearerToken()
                .then(resolve)
                .catch(reject)
        } else {
            resolve();
        }
    });
}

function getLocalSession() {
    return new Promise((resolve, reject) => {
        console.log("Start getLocalSession");
        MongoClient.connect(config.db.dbPath + config.db.databaseName, function(err, db){
            if(err)
                reject(err);

            db.collection(config.db.collections.session.name).find().limit(1).sort({issued:-1}).toArray(function(err, result){
                if(err){
                    db.close();
                    reject(err);
                }

                var session = result[0];

                if (session && session.expires <= Date.now()) {
                    session = null;
                }

                db.close();
                resolve(session);
            });
        });
    });
}

// TODO: Need to complete this when API is provided.
function getRemoteSession() {
    return new Promise((resolve, reject) => {
        console.log("Start getRemoteSession");
        resolve();
    });
}

// TODO: Need to complete this when API is provided.
function saveSession() {
    return new Promise((resolve, reject) => {
        console.log("Start saveSession.");
        resolve();
    });
}

// TODO: Need to complete this when API is provided.
function pollNewCards() {
    return new Promise((resolve, reject) => {
        console.log("Start pollNewCards.");
        resolve();
    });
}

// TODO: Need to complete this when API is provided.
function processNewCards() {
    return new Promise((resolve, reject) => {
        console.log("Start processNewCards.");
        resolve();
    });
}

// TODO: Need to complete this when API is provided.
function pollPriceUpdates() {
    return new Promise((resolve, reject) => {
        console.log("Start pollPriceUpdates.");
        resolve();
    });
}

// TODO: Need to complete this when API is provided.
function processPriceUpdates() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
