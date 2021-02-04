if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app=express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser =require('body-parser')
const flash = require('express-flash')
const session = require('express-session')

const indexRouter = require('./routes/index')
const homeRouter =require('./routes/home')
const designerRouter= require('./routes/designer')
const loginUserRouter=require('./routes/login')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({limit: '10mb',extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}))


const mongoose = require('mongoose')
const passport = require('passport')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('connected to mongoose'))

app.use('/',indexRouter)
app.use('/home',homeRouter)
app.use('/designer',designerRouter)
app.use('/login',loginUserRouter)

app.listen(process.env.PORT||3000)