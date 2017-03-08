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
            res.status(200).send(contact);   
        }
    });

});

router.post('/', function (req, res) {
    
    db.insert(req.body);
    
    res.status(201).send(req.body);
});
/**
router.put('/:name', function (req, res) {
    const name = req.params.name;
    const updatedContact = req.body;
    
    contacts = contacts.map((contact) => {
        if (contact.name == name) {
            return updatedContact;
        } else {
            return contact;
        }
    });
    res.status(200).send('Contacts updated');
});


router.delete('/:name', function (req, res) {
    const toDelete = contacts.filter(item => {
       return item.name != req.params.name; 
    });

    let index = contacts.indexOf(toDelete[0]);
    if (index > -1) {
        contacts.splice(index, 1);
        res.send(contacts);
    } else {
        res.sendStatus('404');
    }
});
**/
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