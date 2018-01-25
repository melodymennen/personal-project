const bodyParser = require('body-parser');
const controller = require('./controller');
const session = require('express-session');
const express = require('express');
const massive = require('massive');
const multer = require('multer');
const axios = require('axios');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET, 
    saveUninitialized: false, 
    resave: false
}));

app.use( express.static( `${__dirname}/../build` ) );

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
});

app.get('/user-data', (req, res) => {
    if (req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.status(403)
    }
});

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/send-ingredients', (req, res) => {
    client.messages.create({
        to: req.body.number,
        from: +14805256886,
        body: req.body.name + '\n'+ req.body.ingredients
    }).then(message => console.log(message.sid))
})

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
  })

  const s3 = new AWS.S3()
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 52428800
    }
  })

  app.post('/upload', upload.single('recipe_image'), (req, res) => {
      const fileName = req.file.originalname.split(' ').join('+')
    s3.putObject({
        Bucket: process.env.BUCKET,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: "image/png",
        ACL: 'public-read'
        }, (err) => {
        console.log('upload error', err)
        if (err) return res.status(400).send(err)
        console.log(`https://s3-${process.env.REGION}.amazonaws.com/${process.env.BUCKET}/${fileName}`)
        res.send(`https://s3-${process.env.REGION}.amazonaws.com/${process.env.BUCKET}/${fileName}`)
    })
})

app.post('/api/recipes', controller.newRecipe)
app.get('/api/recipes', controller.getAll)
app.get('/api/recipes/random', controller.getRandom)
app.get('/api/recipes/:recipe_id', controller.oneRecipe)
app.get('/api/categories', controller.getCategories)
app.get('/api/categories/:category_id', controller.recipesByCategory)
app.put('/api/recipes/:recipe_id', controller.update)
app.delete('/api/recipes/:recipe_id', controller.delete)
app.post('/api/favorites', controller.addFavorite)
app.get('/api/favorites/:user_id', controller.getFavorites)

const port = process.env.SERVER_PORT
app.listen(port, () => console.log(`listening on port ${port}`));
