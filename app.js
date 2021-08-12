const express = require('express');
const app = express();
const movies = require('./movies.json');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>  {
    return res.send("You are on the homepage");
})

app.get('/movies', (req, res) =>  {
  return res.send(movies);
})

app.get('/movies/:id', (req, res) =>  {
  return res.send(
       movies.filter(movie => {
           if(movie.movieID == req.param.id)
           {return movie.movieId}
  }))
})


app.post('/movies', (req, res) =>  {
    /* POST REQ */
});

app.delete('/movies/:id', (req, res) =>  {
  
});


