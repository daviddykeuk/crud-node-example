const Joi = require('joi');

const schema = Joi.object().keys({
    id: Joi.string().alphanum().min(16).max(16),
    first_name: Joi.string().alphanum().min(1).max(30).required(),
    last_name: Joi.string().alphanum().min(1).max(30).required(),
    email: Joi.string().email().required()
});

exports.validate = (contact) => {
    return Joi.validate(contact, schema);
}