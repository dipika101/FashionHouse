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
    var n;
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
        rePassword: req.body.rePassword,
    })
    n=req.body.password.length;
   // try {
        if(req.body.name!==""&&req.body.email!=="")
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
    //}catch {
      //      res.render('home/signUp',{
        //     user: user,
          //   errorMessage:'Error creating account'
       // })
    //}
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