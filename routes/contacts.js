'use strict';

const express = require('express');
const router = express.Router();


const contacts = [
    {
        "name": "Pepe",
        "phone": "111222333",
        "email": "pepe@pepe.com"
    },
    {
        "name": "Antonio",
        "phone": "444555666",
        "email": "antonio@antonio.com"
    }
];

router.get('/', function (req, res) {
    res.send(contacts);
});

router.get('/:name', function (req, res) {
    const name = req.params.name;
    
    const contact = (contacts.filter((contact) => {
       return contact.name === name; 
    })[0]);
    
    if (contact != undefined){
        res.status(200).send(contact);
    } else {
        res.status(404).send({msg: 'The user does not exist'});
    }
    
});

router.post('/', function (req, res) {
    contacts.push(req.body);
    res.sendStatus(201);
    res.send(req.body);
});

router.delete('/', function (req, res) {
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

module.exports = router;