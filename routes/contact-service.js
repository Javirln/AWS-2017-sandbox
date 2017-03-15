'use strict';

const DataStore = require('nedb');
const path = require('path');

const dbFilename = path.join(__dirname, '../contacts.json');

const db = new DataStore({
   filename: dbFilename,
   autoload: true
});

const Contacts = function () {};


Contacts.prototype.allContacts = function(callback) {
    return db.find({}, callback);
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


