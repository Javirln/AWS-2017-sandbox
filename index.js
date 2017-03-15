'use strict';

const express = require('express');
const app = express();
const path = require('path');
const port = (process.env.PORT || 3000);
const contactsService = require('./routes/contact-service');

const bodyParser = require('body-parser');

const contacts = require("./routes/contacts");
const baseApi = '/api/v1';

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname + '/public')));

app.use(baseApi + '/contacts', contacts);

contactsService.connectDb((err) => {
    if (err) {
        console.log("Could not connect with MongoDB");
        process.exit(1);
    }
    
    app.listen(port, () => {
        console.log("Server with GUI up and running!!");
    });    
});
