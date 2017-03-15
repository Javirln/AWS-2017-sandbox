'use strict';

const express = require('express');
const router = express.Router();

const contacts = require('./contact-service');
console.log(contacts);

router.get('/', function (req, res) {
    
    contacts.allContacts((err, contacts) => {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.status(200).send(contacts);   
        }
    });
    
});

router.get('/:name', function (req, res) {
    const name = req.params.name;
    
    contacts.get(name, (err, contact) => {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.status(200).send(contact[0]);   
        }
    });

});

router.post('/', function (req, res) {
    contacts.add(req.body, (err, newDoc) => {
        if (err || newDoc === undefined) {
            res.status(404).send({msg: err});
        } else {
            res.status(201).send(req.body);       
        }
    });
    
});

router.put('/:name', function (req, res) {
    const name = req.params.name;
    const updatedContact = req.body;
    
    contacts.update(name, updatedContact, (err, numUpdates) => {
        if (err || numUpdates === 0) {
            res.statusCode = 404;
            res.send({msg: err});
        } else {
            res.statusCode = 200;
            res.send(numUpdates.toString());
        }
    });
});


router.delete('/:name', function (req, res) {
    
    contacts.remove(req.params.name, (err, numRemoved) => {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.statusCode = 200;
            res.send(numRemoved.toString());
        }
    });
    
});

router.delete('/', function (req, res) {
    
    contacts.removeAll((err, numRemoved) => {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.statusCode = 200;
            res.send(numRemoved.toString());
        }
    });
    
});

module.exports = router;