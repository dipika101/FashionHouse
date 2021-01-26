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
router.get('/login',(req,res)=>{
    res.render('home/login')
})

//sign-up section
router.post('/',(req,res)=>{
    // try{
    var password=req.body.password;
    var email=req.body.password;
    User.findOne({email:email})
    .then(User=>{
        if(User){
            bcrypt.compare(password,User.password, function(error,result){
                if(error)
                {
                    res.json({error})
                }
                if(result){
                    let token= jwt.sign({name: User.name},'verySecretValue',{expiresIn:'2h'})
                    res.json({
                        message:'login sucessful',
                        token
                    })
                }else{
                    res.json({
                        message:'password do not match!!'
                    })
                }
            })
        }
        else{
            console.log("no user found")
        }
    })
// }catch{
//     res.redirect(``)
//     errorMessage='error in login'
// }
// })

module.exports=router