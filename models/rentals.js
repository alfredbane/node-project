const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        
        type: new mongoose.Schema({
            name: { type: Boolean, required: true },
            isGold: { type: Boolean, default: false }
        }),
        required: true

    },

    movie: {
        
        type: new mongoose.Schema({
            name: { type: Boolean, required: true },
            dailyRentalRate: Number
        }),

        required: true,

    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },

    dateReturned: {
        type: Date,
    },

    rentalFee: {
        type: Number,
        min: 0
    }

});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
    });

    return schema.validate(rental);
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validateRental = validateRental;