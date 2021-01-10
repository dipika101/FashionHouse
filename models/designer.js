const mongoose = require('mongoose')

const imageBasePath='uploads/image'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    imageRefWorksName:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Designer',userSchema)
module.exports.imageBasePath=imageBasePath