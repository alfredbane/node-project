const express = require('express');
const customerRoute = express.Router();
const {customerSchema, Customer, validateCustomer} = require('../models/customer.js');

customerRoute.get('/', async (req, res) => {
    
    const result = await Customer.find().sort('name');

    res.send(result);

});

customerRoute.post('/', async (req, res)=> {
    
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error);

    const customer = new Customer ({
        name: req.body.name,
        isGold: req.body.isGold
    });

    const result = await customer.save();

    res.send(result);
    
});

// customerRoute.get('/:id', async(req, res) => {
    
//     const result = await Movie.findById(req.params.id);
    
//     if(!result) return res.status(404).send("The Movie does not exist");
    
//     res.send(result);

// });

// customerRoute.put('/:id', async(req, res) => {
    
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

// customerRoute.delete('/:id', async(req, res) => {

//     const item = await Movie.findById(req.params.id);
    
//     if(!item) return res.status(404).send("The Movie does not exist");

//     const result = await Movie.findByIdAndRemove(req.params.id);

//     res.send(result);

// });

module.exports = customerRoute;