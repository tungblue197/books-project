const {
    userRegister,
    userLogin
} = require('./user.schema')

module.exports = {
    userRegisterValidation : async (req, res, next) => {
        try {
            const value = await userRegister.validate(req.body)
            if (value.error) return res.json({
                error: 'validated',
                message: value.error.details
            })
            next()
        } catch (error) {
            next(error)
        }
    },
    userLoginValidation: async (req, res, next) =>{
        try {
            const value = await userLogin.validate(req.body)
            if(value.error) return res.json({
                error: 'validated',
                message: value.error.details
            })
            next()
        } catch (error) {
            next(error)
        }
    }
}