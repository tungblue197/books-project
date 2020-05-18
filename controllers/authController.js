const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config({path:'../.env.local'})

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const {
                username,
                email
            } = req.body

            //check user is exited?
            const userExist = await User.findOne().or([{
                username: username
            }, {
                email: email
            }])
            if (userExist) return next(new Error('user is existed!'))

            // hash password
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)

            //user is not exited, create new user add to database
            let user = new User(req.body)
            await user.save()
            res.json({
                user
            })
        } catch (error) {
            next(error)
        }
    },
    //login controller here............
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body

            // looking for user math with email
            const user = await User.findOne({email})

            // if email not exist login false
            if(!user) return res.json({
                login:false,
                message:'email not exist'
            })
            //check password vs password hashed
            const math = await bcrypt.compare(password, user.password)
            // if math login success
            if(math) {
                // create a token with payload
                const token = await jwt.sign({
                    payload:{
                        userId:user._id,
                        username:user.username
                    }
                },process.env.SECRET_KEY)
                res.header('token',token)
                return res.json({
                    login:true,
                    message:'login success'
                })
            }
            
            // finally
            res.json({
                login:false,
                message:'password wrong'
            })
        } catch (error) {
            next(error)
        }
       
    }
}