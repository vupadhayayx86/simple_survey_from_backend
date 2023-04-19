const mongoose=require('mongoose')
const Joi=require('joi')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20
    },
    email:{
        type:String,
        require:true,
        unique:true,
        minlength:8,
        maxlength:30
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    }
},{timestamps:true})

const Users=mongoose.model("Users",userSchema)


function validateUsers(Users){
    const schema=Joi.object({
        username:Joi.string().min(5).max(20).required(),
        email:Joi.string().min(8).max(30).required(),
        password:Joi.string().min(8).max(30).required()
    })

    return schema.validate(Users)
}

exports.Users=Users
exports.validateUsers=validateUsers



