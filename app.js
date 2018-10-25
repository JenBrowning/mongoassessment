//To connect to server and run database:
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    
    insertDocuments(db, function() {
        updateDocument(db, function() {
            removeDocument(db, function() {
                indexCollection(db, function() {

                });
            });
        });
    });
});


//Insert a document
const insertDocuments = function(db, callback) {

    const collection = db.collection('documents');

    collection.insertMany([
        {a : 1}, {a : 2}, {a: 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection');
        callback(result);
    });
}

// to change to Promise
// //Insert a document
// const insertDocuments = function(db, callback) {
//     const collection = db.collection('documents');
//     return collection.insertMany([
//         {a : 1}, {a : 2}, {a: 3}
//     ].then(function(result) {
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log('Inserted 3 documents into the collection');
//         callback(result);
//     }).catch(err => console.log(err))
// }


//calling the insertdocuments function
const findDocuments = function (db, callback) {
    const collection = db.collection('documents');
    collection.find({
        'a': 3
    }).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log('Found the following records');
        console.log(docs);
        callback(docs);

    })
}


//updating a document
const updateDocument = function(db, callback) {
    const collection = db.collection('documents');
    collection.updateOne({ a: 2}, { $set: {b : 1}}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('updated the document with a field equal to 2')
        callback(result);
    });
}


//
const removeDocument = function(db, callback) {
    const collection = db.collection('documents');
    collection.deleteOne({
        a: 3
    }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('removed the document with the field equal to')
        callback(result);
    });
}

//add the indexCollection method
const indexCollection = function(db, callback) {
    db.collection('documents').createIndex(
        {'a': 1 },
        null,
        function(err, results) {
            console.log(results);
            callback();
        }
    )
}





