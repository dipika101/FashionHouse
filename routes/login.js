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
router.post('/',async (req,res)=>{
    var password=req.body.password;
    var email=req.body.password;
    User.findOne({email:email})
    .then(user=>{
        if(user){
            //compare password
        }
        else{
            console.log("no user found")
        }
    })
    
})

module.exports=router