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
    res.status(200).send(contacts);
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
    res.status(201).send(req.body);
});

router.put('/:name', function (req, res) {
    const name = req.params.name;
    const updatedContact = req.body;
    
    const cont = 0;
    
    contacts = contacts.map((contact) => {
        if (contact.name == name) {
            cont++;
            return updatedContact;
        } else {
            return contact;
        }
    });
    res.status(200).send({msg: `${cont} contacts updated`});
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

router.delete('/', function (req, res) {
    contacts = [];
    res.status(200).send(contacts);
});



module.exports = router;