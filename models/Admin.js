const mongoose = require('mongoose')

module.exports =mongoose.model('Admin',{
    firstName:String,
    lastName:String,
    email: String,
    password: String

})






