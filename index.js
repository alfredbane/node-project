const express = require('express');
const app = express();

const mongoose = require('mongoose');
const moviesroute = require('./routes/movies.js');
const genreroute = require('./routes/genre.js');
const customerroute = require('./routes/customer.js');
const rentalsroute = require('./routes/rentals.js');


mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log("Connected to Db"))
    .catch((err)=> console.log(err));

app.use(express.json());

app.use('/api/v1.0/movies', moviesroute);
app.use('/api/v1.0/genre', genreroute);
app.use('/api/v1.0/customer', customerroute);
app.use('/api/v1.0/rentals', rentalsroute);

app.listen("3000", () => {
    console.log("Listening to Port 3000");
});