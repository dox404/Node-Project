const jwt=require("jsonwebtoken")
const User=require("../models/register-model")

const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        const verifyUser=jwt.verify(token,"MYNAMEISMUKTARULHOQUE")
        // console.log(verifyUser)
       
        next()
        

    } catch (error) {
    //  res.status(401).send(error)
    res.render('login')
    }
}

module.exports=auth;