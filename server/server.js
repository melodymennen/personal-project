const bodyParser = require('body-parser');
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET, 
    saveUninitialized: false, 
    resave: false
}));

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(error => {
    console.log('error', error)
});

app.post('/api/recipes', controller.newRecipe)
// app.post('/api/favorites', controller.addFavorite)
// app.get('/api/recipes', controller.getAll)
// app.get('/api/recipes/:category_id', controller.getCategory)
// app.get('/api/favorites/:user_id', controller.getFavorites)
// app.delete('/api/recipes/:recipe_id', controller.delete)
// app.put('/api/recipes/:recipe_id', controller.update)

const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}`));
