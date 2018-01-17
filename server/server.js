const bodyParser = require('body-parser');
const controller = require('./controller');
const session = require('express-session');
const express = require('express');
const massive = require('massive');
const axios = require('axios');
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

app.post('/login', (req, res) => {
    const {userId} = req.body
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`
    axios.get(auth0Url, {headers: {Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN}}).then(response => {
        const userData = response.data
        app.get('db').find_user(userData.user_id).then(users => {
            if(users.length){
                req.session.user = users[0]
                res.json({user: req.session.user})
            } else {
                app.get('db').create_user([userData.name, userData.email, userData.picture, userData.user_id]).then(user => {
                    req.session = user[0]
                    res.json({user: req.session.user})
                }).catch(error => console.log('create user error',error))
            }
        }).catch(error => console.log('find user error',error))
    }).catch(error => console.log('get auth0 data error',error))
})

app.get('/user-data', (req, res) => {
    if (req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.status(403)
    }
})

app.post('/api/recipes', controller.newRecipe)
app.get('/api/recipes', controller.getAll)
app.get('/api/recipes/:recipe_id', controller.oneRecipe)
app.get('/api/categories', controller.getCategories)
app.get('/api/categories/:category_id', controller.recipesByCategory)
app.put('/api/recipes/:recipe_id', controller.update)
app.delete('/api/recipes/:recipe_id', controller.delete)
app.post('/api/favorites', controller.addFavorite)
app.get('/api/favorites/:user_id', controller.getFavorites)

const port = process.env.SERVER_PORT
app.listen(port, () => console.log(`listening on port ${port}`));
