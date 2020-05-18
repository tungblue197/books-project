const {
    Schema,
    model
} = require('mongoose')

const {getSalt, hash} = require('bcryptjs')


//create Schema

const userSchema = Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author'
    },
    favoritesList: [{
        type: Schema.Types.ObjectId,
        ref: 'book'
    }]
})


module.exports = model('user', userSchema)