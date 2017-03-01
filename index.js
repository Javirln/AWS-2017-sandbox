'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const contacts = require("./routes/contacts");

const app = express();

const port = ( process.env.PORT || 3000);

let baseApi = '/api/v1';

app.use(bodyParser.json());

app.get(baseApi + '/contacts', contacts.list);
app.post(baseApi + '/contacts', contacts.create);
app.delete(baseApi + '/contacts/:name', contacts.deleteUser);


app.use((request, response) => {
    response.statusCode = 404;
    response.end("404!");
});


app.listen(port, () => {
    console.log('Server up and running');
});