const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const {genreSchema} = require('./genre.js');

const movieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    genre: genreSchema,
    numberInStock: Number,
    dailyRentalRate: Number
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    
    const schema = Joi.object({
        name: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    });

    return schema.validate(movie);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validateMovie = validateMovie;