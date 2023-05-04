const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const {Users,validateUsers}=require("../models/users_models")

router.get("/",(req,res)=>{
    res.send("Get Router")
})

router.post("/",async (req,res)=>{
    const {errors}=validateUsers(req.body)
    if(errors) return res.status(400).send("Something went wrong")

    let user=await Users.findOne({email:req.body.email})
    if(user) return res.status(400).send("User already Registered")

    user=new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    })

    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)

    await user.save()
    res.cookie('jwtCookie',"dummydataaasdasfahsfdf",{httpOnly:false,maxAge:60*60*1000})
    res.send(user)
})

module.exports=router