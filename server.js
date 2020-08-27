const express = require('express');
const parser = require('body-parser');
const ip = require('ip');
// const config = require('./config.json');
// const enums = require('./helpers/enums');
const server = require('http').createServer();
const path = require('path');
const app = express();
app.set('views' , path.join(__dirname,'views'));
app.set('view engine','ejs');
app.set('view options', {layout: 'layout.ejs'});
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
const validator= require('validator')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mahika", { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true});


const nodemailer = require('nodemailer');
var bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
const secret = 'abcdefg';
var session = require('express-session')
var _ = require("lodash")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var multer = require('multer')
var sharp = require('sharp');
const cryto = require("crypto");
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
const fs = require('fs');
// require("./passport-setup");
app.use(express.static('public'));


const Letter = require("./model/letterModel");
const Author = require("./model/authorModel");
const Letter_Audit = require("./model/letter_auditModel");

require("./passport-setup");
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

app.get('/google',
  passport.authenticate('google', { scope: ['email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {

    res.redirect('/');
  });
//   app.get('/facebook',
//   passport.authenticate('facebook', { scope: 'read_stream' })
// );
// app.get('/facebook',
//   passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
// );
  app.get('/facebook',
  passport.authenticate('facebook',  { scope: ['email'] }));

  app.get('/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
  failureRedirect: '/register' }
    //   console.log(err,user,info);
  )
  );



var storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {

        cb(null, file.originalname + path.extname(file.originalname));
    }
});

var singleupload = multer({ storage: storage }).single('file')

var secondstorage = multer.diskStorage({
    destination: "./public/second/",
    filename: (req, file, cb) => {

        cb(null, file.originalname + path.extname(file.originalname));
    }
});

var secondupload = multer({ storage: secondstorage }).single('file')

app.get('/update',function(req,res){
    res.render('update');
})


app.get('/whatsappregister',function(req,res){
    res.render('whatsappreg');
})

app.post('/whatsappregister',urlencodedParser,singleupload,function(req,res){
    var currentdate = new Date(); 

    var datetime =currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();


    let newauthor = new Author();
    newauthor.author_name = req.body.author_name;
    newauthor.phone = req.body.phone;
    newauthor.author_id = newauthor._id;
    let author_id = newauthor._id;
    newauthor.save(function (err) {
        if (err) {
            console.log(err, 'error')
            return
        }
    });

    let newletter = new Letter();
    newletter.author_name = req.body.author_name;
    newletter.letter = req.file.filename;
    newletter.uuid = newletter._id;
    newletter.author_id = author_id;
    newletter.channel = "WHATSAPP";
    newletter.rework_flag = "N";
    newletter.includes_solution = "N";
    newletter.received = datetime;

    newletter.save(function (err) {
        if (err) {
            console.log(err, 'error')
            return
        }
        // console.log(newletter._id);
        
})
    let newletter_audit = new Letter_Audit();
    newletter_audit.letter_uuid = newletter.uuid;
    newletter_audit.action = "RECEIVED";
    newletter_audit.action_date = datetime;
    newletter_audit.save(function (err) {
        if (err) {
            console.log(err, 'error')
            return
        }
    })
        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'website.mmf@gmail.com',
        //         pass: 'sunshine@123'
        //     }
        // });
        // let mailOptions = {
        //     from: 'website.mmf@gmail.com',
        //     to: req.body.email,
        //     subject: 'Successfull Registration',
        //     text: 'Dear NGO,\n\n Thank you for your Registration. \n\nPlease visit the website for further updates.\n\nIt is an auto generated mail so please do not reply.\n\n-Regards, SHUDDHI',
           
        // };
        // transporter.sendMail(mailOptions, function (err, data) {
        //     if (err) {
        //         console.log('Error Occurs');
        //     } else {
        //         console.log('Email Sent');


        //     }

        // });
    res.redirect('/');
})









app.get("*",function(req,res){
    res.end("<h1>response from express server</h1>");
})
const port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log("server is listening");
})
