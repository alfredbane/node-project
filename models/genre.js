const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreSchema = new mongoose.Schema({
    name: {type: String, required: true},
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    
    const schema = Joi.object({
        name: Joi.string().required(),
    });

    return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validateGenre = validateGenre;