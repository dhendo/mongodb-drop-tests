var mongo = require('mongodb')
var databaseOptions = {host:"localhost", port:27017, DB:"drop_test", collection:"drop_test"};
var Server = mongo.Server, Db = mongo.Db;
var server = new Server(databaseOptions.host, databaseOptions.port, {auto_reconnect:true});
var testDB = new Db(databaseOptions.DB, server);
var startTime;
var async = require('async');
var common = require('./common');
var items = common.items;
var insertData = common.insertData;
var finished = common.finished;

common.name = "Drop Collection"

testDB.open(function (err, db) {
    var removeCollection = db.collection(databaseOptions.collection);
    insertData(db, removeCollection, items, function () {
            require('./common').startTime = new Date();
            removeCollection.drop(finished);
    });
});
