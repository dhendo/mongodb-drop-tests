var mongo = require('mongodb')
var databaseOptions = {host:"localhost", port:27017, DB:"removeeach_test", collection:"removeeach_test"};
var Server = mongo.Server, Db = mongo.Db;
var server = new Server(databaseOptions.host, databaseOptions.port, {auto_reconnect:true});
var testDB = new Db(databaseOptions.DB, server);
var startTime;
var async = require('async');
var common = require('./common');
var items = common.items;
var insertData = common.insertData;
var finished = common.finished;

common.name = "Remove Each"

testDB.open(function (err, db) {
    var removeCollection = db.collection(databaseOptions.collection);

    insertData(db, removeCollection, items, function () {
        var cursor = removeCollection.find({}, {'_id':1});
        cursor.toArray(function (err, arrIDs) {
            require('./common').startTime = new Date();
            var deleteID = function (id, callback) {
                removeCollection.remove(id, {safe:true}, function () {
                    process.nextTick(callback)
                });
            }
            require('./common').startTime = new Date();
            async.forEachSeries(arrIDs, deleteID, finished);
        });
    });
});
