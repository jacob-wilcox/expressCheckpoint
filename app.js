const express = require('express');
const app = express();
const {development} = require('./knexfile.js');
const knex = require('knex')(development);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) =>  {
    return res.send("You are on the homepage");
});
// /movies?title={titleQuery}
app.get('/movies', (req, res) =>  {
  if (req.query.title) {
    let titleQuery = req.query.title
    knex.select().from('movies').where('title', 'like', `%${titleQuery}%`)
    .then((result) => {
      res.send(result);
    })
  } else {
    knex.select().from('movies').then((result) => {
      res.send(result);
    })
  }
});

app.get('/movies/:id', (req, res) =>  {
  let query = req.params.id
  if (isNaN(query)) {
    res.status(400).send('Invalid ID supplied')
  } else {
    knex.select().from('movies')
      .where('id', query)
      .then((result) => {
        if (result.length === 0) {
          res.status(404).send('Book ID not found')
        } else {
          res.send(result);
        }
      })
  }
});

app.get('/readCookie', (req, res) => {
  res.send(res.cookies)
})

app.post('/setCookie', (req, res) => {
  res.cookie('firstName', req.cookies.firstName).cookie('lastName', req.cookies.lastName).send(`All cookies set`)
})

app.post('/movies', (req, res) =>  {
  let body = req.body
  knex('movies').insert(body).then(() => {
    res.send(`You added ${body.title}`)
  })
});

app.delete('/movies/:id', (req, res) => {
  let movie = req.params.id
  knex('movies').where('id', movie)
  .del().then(() => {
    return res.send(`You deleted the movie with ID: ${movie}`);
  })
});

module.exports = app;

