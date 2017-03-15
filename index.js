'use strict';

const express = require('express');
const app = express();
const path = require('path');
const port = ( process.env.PORT || 3000);

const bodyParser = require('body-parser');

const contacts = require("./routes/contacts");
const baseApi = '/api/v1';

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname + '/public')));

app.use(baseApi + '/contacts', contacts);

app.listen(port, () => {
    console.log('Server up and running');
});