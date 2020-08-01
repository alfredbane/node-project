const express = require('express');
const movieRoute = express.Router();
const {Movie, validateMovie} = require('../models/movies.js');
const {Genre} = require('../models/genre.js');

movieRoute.get('/', async (req, res) => {
    
    const result = await Movie.find();

    res.send(result);

});

movieRoute.post('/', async (req, res)=> {
    
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.satus(404).send("Invalid Genre");

    const movie = new Movie ({
        name: req.body.name,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    const result = await movie.save();

    res.send(result);
    
});

movieRoute.get('/:id', async(req, res) => {
    
    const result = await Movie.findById(req.params.id);
    
    if(!result) return res.status(404).send("The Movie does not exist");
    
    res.send(result);

});

movieRoute.put('/:id', async(req, res) => {
    
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error);

    const result = await Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new:true });
    
    if(!result) return res.status(404).send("The Movie does not exist");
    
    res.send(result);
    
});

movieRoute.delete('/:id', async(req, res) => {

    const item = await Movie.findById(req.params.id);
    
    if(!item) return res.status(404).send("The Movie does not exist");

    const result = await Movie.findByIdAndRemove(req.params.id);

    res.send(result);

});

module.exports = movieRoute;