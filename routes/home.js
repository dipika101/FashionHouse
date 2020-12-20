const express = require('express')
const router = express.Router()
const User = require('../models/user')

//home route
router.get('/',(req,res)=>{
    res.render('home/index')
})

//login section
router.get('/signUp',(req,res)=>{
    res.render('home/signUp',{user:new User()})
})

//sigin-up section
router.post('/',async (req,res)=>{
    const user = new User({
        name: req.body.name
    })
    try {
        const newUser = await user.save()
        //res.redirect(`home/$newUser.id}`)
         res.redirect(`home`)
         console.log('account created')
    } catch {
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