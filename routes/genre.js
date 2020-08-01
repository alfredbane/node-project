const express = require('express');
const genreRoute = express.Router();
const {Genre, validateGenre} = require('../models/genre.js');

genreRoute.get('/', async (req, res) => {
    
    const result = await Genre.find();

    res.send(result);

});

genreRoute.post('/', async (req, res)=> {
    
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error);

    const genre = new Genre ({
        name: req.body.name,
    });

    const result = await genre.save();

    res.send(result);
    
});

// genreRoute.get('/:id', async(req, res) => {
    
//     const result = await Movie.findById(req.params.id);
    
//     if(!result) return res.status(404).send("The Movie does not exist");
    
//     res.send(result);

// });

// genreRoute.put('/:id', async(req, res) => {
    
//     const {error} = validateMovie(req.body);
//     if(error) return res.status(400).send(error);

//     const result = await Movie.findByIdAndUpdate(req.params.id, {
//         name: req.body.name,
//         numberInStock: req.body.numberInStock,
//         dailyRentalRate: req.body.dailyRentalRate
//     }, { new:true });
    
//     if(!result) return res.status(404).send("The Movie does not exist");
    
//     res.send(result);
    
// });

// genreRoute.delete('/:id', async(req, res) => {

//     const item = await Movie.findById(req.params.id);
    
//     if(!item) return res.status(404).send("The Movie does not exist");

//     const result = await Movie.findByIdAndRemove(req.params.id);

//     res.send(result);

// });

module.exports = genreRoute;