const {Movie} = require('../models/movies.js');
const {Customer} = require('../models/customer.js');
const {Rental, validateRental} = require('../models/rentals.js');
const mongoose = require('mongoose');
const Fawn = require('fawn');

const express = require('express');
const rentalRoute = express.Router();

// To create new transactions in node with mongo db
Fawn.init(mongoose);

rentalRoute.get('/', async (req, res) => {
    
    const result = await Movie.find();

    res.send(result);

});

rentalRoute.post('/', async (req, res)=> {
    
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.satus(404).send("Customer does not exist");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.satus(404).send("Movie does not exist");

    let rental = new Rental ({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        movie: {
            _id: movie._id,
            name: movie.name,
            dailyRentalRate: movie.dailyRentalRate
        },
    });

    try{

        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id}, {
            $inc: { numberInStock: -1}
        })
        .run();

    }
    catch(ex) {
        res.send(500).send('Something failed.');
    }

    res.send(rental);
    
});

// rentalRoute.get('/:id', async(req, res) => {
    
//     const result = await Movie.findById(req.params.id);
    
//     if(!result) return res.status(404).send("The Movie does not exist");
    
//     res.send(result);

// });

// rentalRoute.put('/:id', async(req, res) => {
    
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

// rentalRoute.delete('/:id', async(req, res) => {

//     const item = await Movie.findById(req.params.id);
    
//     if(!item) return res.status(404).send("The Movie does not exist");

//     const result = await Movie.findByIdAndRemove(req.params.id);

//     res.send(result);

// });

module.exports = rentalRoute;