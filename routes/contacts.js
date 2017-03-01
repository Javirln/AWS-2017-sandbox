'use strict';

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

module.exports.list = (req, res) => {
    res.send(contacts);
};

module.exports.create = (req, res) => {
    contacts.push(req.body);
    res.sendStatus(201);
    res.send(req.body);
};

module.exports.deleteUser = (req, res) => {
    const toDelete = contacts.filter(item => {
       return item.name != req.params.name; 
    });

    let index = contacts.indexOf(toDelete[0]);
    if (index > -1) {
        contacts.splice(index, 1);
        res.send(contacts);
    } else {
        res.sendStatus(404);
    }
};