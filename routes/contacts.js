'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const dataStore = require('nedb');


const dbFilename = path.join(__dirname, '../contacts.json');

const db = new dataStore({
   filename: dbFilename,
   autoload: true,
   corruptAlertThreshold: 1
});

router.get('/', function (req, res) {
    
    db.find({}, (err, contacts) => {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.status(200).send(contacts);   
        }
    });
    
});

router.get('/:name', function (req, res) {
    const name = req.params.name;
    
    db.find({name: name}, (err, contact) => {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.status(200).send(contact[0]);   
        }
    });

});

router.post('/', function (req, res) {
    
    db.insert(req.body, (err, newDoc) => {
        if (err || newDoc == undefined) {
            res.status(404).send({msg: err});
        } else {
            res.status(201).send(req.body);       
        }
    });
    
});

router.put('/:name', function (req, res) {
    const name = req.params.name;
    const updatedContact = req.body;
    
    db.update({name: name},updatedContact,{},(err, numUpdates) => {
        if (err || numUpdates == 0) {
            res.status(404).send({msg: err});
        } else {
            res.status(200).send(numUpdates);  
        }
    });
});


router.delete('/:name', function (req, res) {
    
    db.remove({name: req.params.name},{multi: true},(err, numRemoved) => {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.status(200).send(numRemoved);  
        }
    });
    
});

router.delete('/', function (req, res) {
    
    db.remove({},{multi: true},(err, numRemoved) => {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.status(200).send(numRemoved);  
        }
    });
    
});


module.exports = router;