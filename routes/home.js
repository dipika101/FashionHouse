const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//home route
router.get('/',(req,res)=>{
    res.render('home/index')
})

//sign-up section
router.get('/signUp',(req,res)=>{
    res.render('home/signUp',{user:new User()})
})

//sign-up section
router.post('/',async (req,res)=>{
    var n=req.body.password.length;
    // var hashpass;
    // var salt=await bcrypt.genSalt(10)
    // await bcrypt.hash(req.body.password,salt,function(err,hashedPass){
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             hashpass=hashedPass
    //         }
    //     })
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try {
         if((req.body.email!=="") && (req.body.name!==" " && (req.body.name!=='')))
         { 
             if(n>=8){
                 if(req.body.password === req.body.rePassword)
                 {
                     const newUser = await user.save()
                     //res.redirect(`home/$newUser.id}`)
                     res.redirect(`home`)
                     console.log('account created')
                 }else{
                 res.send("password doesn't match...")
                 }
             }else{
                 res.send("password should have 8 char or more then 8 char..")
             }
         }else{
             res.send("Please fill all fields...")
         }
     }catch{
             res.render('home/signUp',{
              user: user,
              errorMessage:'Error creating account'
         })
     }  
})

module.exports=router