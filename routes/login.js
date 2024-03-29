const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt=require('bcryptjs')
const passport=require('passport')
// const methodOverride = require('method-override')
const initializePassport = require("../routes/passport-config")
initializePassport(
    passport,
    email=>User.find(User => user.email===email),
    id =>User.find(User => user.id===id)
)
router.use(passport.initialize())
router.use(passport.session())
// router.use(methodOverride('_method'))
//home route
router.get('/',checkAuthonticated,(req,res)=>{
    res.render('home/index',{name : req.user.name})
})

//sign-up section
router.get('/login',(req,res)=>{
    res.render('home/login')
})

//sign-up section
router.post('/login',passport.authenticate('local',{
    successRedirect: 'home/user',
    failureRedirect: 'home/login',
    failureFlash: true
}))

// router.delete('/logout',(req,res)=>{
//     req.logOut()
//     res.redirct('home/index')
// })
function checkAuthonticated(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    else{
        res.redirct('home/login')
    }
} 
module.exports=router