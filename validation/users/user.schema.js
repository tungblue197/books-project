const joi = require('@hapi/joi')

const schema = {
    userRegister: joi.object({
        username: joi.string().max(28).min(8).required(),
        password: joi.string().max(28).min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        gender: joi.string().max(10).valid('nam','nữ').required(),
        email:joi.string().email().required()
    }),
    userLogin: joi.object({
        email:joi.string().email().required().min(16),
        password:joi.string().max(28).min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
}
module.exports = schema;