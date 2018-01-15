const bodyParser = require('body-parser');
const express = require('express');
const massive = require('massive');
const controller = require('./controller');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
});

app.post('/api/recipes', controller.post)

const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}`));