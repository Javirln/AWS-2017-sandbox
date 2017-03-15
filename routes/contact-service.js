'use strict';

const MongoClient = require('mongodb').MongoClient;
var db;

const Contacts = function () {};

Contacts.prototype.connectDb = function(callback) {
    //MONGODB_URL = mongodb://127.0.0.1:27017/aws
    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.collection('contacts');
        
        callback(err, database);
    });
};

Contacts.prototype.allContacts = function(callback) {
    return db.find({}).toArray(callback);
};

Contacts.prototype.add = function(contact, callback) {
    return db.insert(contact, callback);
};

Contacts.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Contacts.prototype.get = function(name, callback) {
    return db.find({name:name}).toArray(callback);
};

Contacts.prototype.remove = function(name, callback) {
    return db.remove({name:name},{ multi: true}, callback);
};

Contacts.prototype.update = function(name, updatedContact, callback) {
    return db.update({name:name},updatedContact,{}, callback);
};

module.exports = new Contacts();


