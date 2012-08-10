module.exports = {};
async = require('async');

module.exports.name = null
module.exports.startTime = null;
module.exports.insertData = function (db, collection, items, callback) {

    db.dropDatabase(function () {

        console.log("\n----------------------------------\n")
        console.log("Inserting " + module.exports.items + " Documents...")
        var count = 0;
        var payload = new Array(1000).join('sgsdgsegwewggseg');

        collection.ensureIndex({payload:1}, {safe:true}, function () {
            async.whilst(function () {
                return count < items;
            }, function (cb) {
                var item = {payload:payload, serial:count}
                collection.insert(item, {safe:true}, function (err, data) {
                    count = count + 1;
                    cb();
                })
            }, function () {
                console.log('Data Inserted. Starting Test.')
                callback();
            });
        });
    });
}

module.exports.finished = function () {
    var elapsed = (new Date() - module.exports.startTime) / 1000;
    console.log(module.exports.name + " Took " + elapsed + "s: " + elapsed / module.exports.items + " per item")
    console.log('\n');
    process.exit();
}

// How many items to insert
module.exports.items = 100000;