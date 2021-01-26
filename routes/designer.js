const express = require('express')
const multer = require('multer')
const path=require('path')
const router = express.Router()
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const Designer = require('../models/designer')
const { JsonWebTokenError } = require('jsonwebtoken')
const uploadPath=path.join('public',Designer.imageBasePath)
const imageMimeTypes=['image/jpeg','image/png','image/gif']
const upload=multer({
    dest:uploadPath,
    fileFilter:(req, file, callback)=>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})
//home route
//  router.get('/',(req,res)=>{
//      res.send('designers')
//  })

//sign-up section
router.get('/signUp',(req,res)=>{
    res.render('home/signD',{designer:new Designer()})
})

//sign-up section
router.post('/',upload.single('image'),async (req,res)=>{
    var n=req.body.password.length;
    // var hashpass;
    // bcrypt.genSalt(8,function(err,salt){
    //     bcrypt.hash(req.body.password,10,function(err,hashedPass){
    //         if(err){
    //             res.json({
    //                 error: err
    //             })
    //         }
    //         else{
    //             hashpass=hashedPass
    //         }
    //     })
    // }) 
    const fileName = req.file != null ? req.file.filename : null
    const designer = new Designer({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        imageRefWorksName: fileName
    })
   try {
        if((req.body.email!=="") && (req.body.name!==" "))
        { 
             if(n>=8){
                if(req.body.password === req.body.rePassword)
                {
                    const newDesigner = await designer.save()
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
    }catch {
            res.render('home/signD',{
             designer: designer,
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