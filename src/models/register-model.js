const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
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
        // unique:true
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
        
})
//generating token
loginSchema.methods.generateAuthToken=async function(){
    try {
        // console.log(this._id)
        let token=jwt.sign({_id:this._id},"MYNAMEISMUKTARULHOQUE")
        // console.log(token)

        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token

    } catch (error) {
        console.log("errrrrrrrrrrrrrrr")
        console.log(error)
    }
}
const User=new mongoose.model('user',loginSchema)
module.exports=User