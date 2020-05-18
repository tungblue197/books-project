const router = require('express').Router()
const {
    userRegisterValidation,
    userLoginValidation
} = require('../validation/users/userValidation')
const {
    createUser,
    login
} = require('../controllers/authController')
//import controllers

console.log()

router.post('/register', userRegisterValidation, createUser)
router.post('/login',userLoginValidation,login)
module.exports = router