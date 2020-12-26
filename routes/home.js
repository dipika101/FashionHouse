const express = require('express')
const router = express.Router()
const User = require('../models/user')

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
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
        rePassword: req.body.rePassword,
    })
    try {
        if(req.body.password == req.body.rePassword)
        {
            const newUser = await user.save()
            //res.redirect(`home/$newUser.id}`)
            res.redirect(`home`)
            console.log('account created')
        }else{
            res.send("password doesn't match")
        }
    }catch {
            res.render('home/signUp',{
             user: user,
             errorMessage:'Error creating account'
        })
    }
    //user.save((err,newUser)=>{
    //     if(err){
    //             console.log(err)
    //             res.render('home/signUp',{
    //             user: user,
    //             errorMessage:'Error creating account'
    //         })
    //     }else{
    //         //res.redirect('home/$newUser.id}')
    //         res.redirect(`home`)
    //     }
    // })
    // 
})

module.exports=router