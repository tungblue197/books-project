require('dotenv').config({path:'./.env.local'})

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//import routers

const authRouter = require('./routes/auth')
const protectPrivateRoute = require('./middlewares/protectPrivateRoute')

//connect to mongodb here

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true ,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',error => {
    console.log(error)
})
db.once('open',() => {
    console.log('connected...')
})

// ----------------------
const app = express()

//middleware 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/public-routes/auth', authRouter)
app.use('/private-routes',protectPrivateRoute,function(req, res, next){
    res.send("vuot qua dc roi ne")
})


app.use(function (req, res, next) {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
        error:{
            message:err.message
        }
    })
})

app.listen(process.env.SERVER_PORT || 3002)