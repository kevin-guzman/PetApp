const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _Schema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: false
    },
    token:{
        type: String,
        required: false
    },
    pets:[{name:String, age:Number, species:String}]
})

const model = mongoose.model('User', _Schema)
module.exports = model