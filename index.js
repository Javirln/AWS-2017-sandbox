'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = ( process.env.PORT || 3000);

let base = '/api/v1';

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

// ROUTES

app.get(base + '/contacts', (req, res) => {
    res.send(contacts);
});

app.post(base + '/contacts', (req, res) => {
   contacts.push(req.body);
   res.send(req.body);
   res.sendStatus(201);
});


app.use((request, response) => {
    response.statusCode = 404;
    response.end("404!");
});


app.listen(port, () => {
    console.log('Server up and running');
});