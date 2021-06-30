const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _Schema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref:'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date: Date,
    file:{
        type:String,
        required: false
    },
    tags:{
        productOrServiceType:{type:String, required:false},
        price:{type:Number, required:false},
        petType:{type:String, required:false},
        sales:{type:Number, required:false},
    }
})

const model = mongoose.model('Publications', _Schema)
module.exports = model