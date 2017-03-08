'use strict';

const express = require('express');
const app = express();
const port = ( process.env.PORT || 3000);

const bodyParser = require('body-parser');

const contacts = require("./routes/contacts");
const baseApi = '/api/v1';

app.use(bodyParser.json());

app.use(baseApi + '/contacts', contacts);

app.use((request, response) => {
    response.statusCode = 404;
    response.end("404!");
});


app.listen(port, () => {
    console.log('Server up and running');
});