const mongoose=require('mongoose');
const loginSchema=new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Gender:{
        type:String
    },
    Password:{
        type:String
    }
        
})
const User=new mongoose.model('user',loginSchema)
module.exports=User