const User = require('../models/user')
const jwt = require('jsonwebtoken')

require('dotenv').config({path:'../.env.local'})


module.exports = async (req, res, next) =>{
    try {
        if(req.headers.token){
            const {payload} = await jwt.verify(req.headers.token,process.env.SECRET_KEY);
            const user = await User.findById({_id:payload.userId})
            if(user) return next()
            return res.json({
                login:false,
                message:'u need login first'
            })
        } 
    } catch (error) {
        next(error)
    }
}