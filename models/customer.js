const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    isGold: {type: Boolean, required: true},
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    
    const schema = Joi.object({
        name: Joi.string().required(),
        isGold: Joi.boolean().required(),
    });

    return schema.validate(customer);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validateCustomer = validateCustomer;