require ('../models/database')
const { name } = require('ejs');
const req = require('express/lib/request');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const Job = require('../models/job');
const User  = require('../models/user')
const bcrypt = require('bcrypt');
const morgan = require('morgan');
var multer = require('multer');
const path = require("path");
const fs = require('fs');


// this is a middleware that will help out with  user browser cookies.
var sessionChecker= async (req, res, next)=>{
    //console.log(req)
    if(req.cookies.user_sid && !req.session.user){
        const jobs = await Job.find({})
        res.render('student_data', { session: req.session.user, jobs: {jobs}})
    }else {
        next()
    }


}

//this is a middle ware that will format and store the images to the database
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
 
var upload = multer({ storage: storage });


// this module will render the home page
exports.HomePage= async (req, res) =>{
    const jobs = await Job.find({})
    console.log(jobs)
    res.render('index', { session: req.session.user, jobs: {jobs}});


}
// this module will render the about page
exports.AboutPage = async (req,res)=>{
    res.render('about',{ session: req.session.user});

}
// this module will render the dashboard page, and display the database collection
exports.DashBoard= async (req, res) =>{
    const jobs = await Job.find({})
    console.log(jobs)
    res.render('dashboard', { session: req.session.user, jobs: {jobs}});

    

}
// create form view
exports.CreatePage = (sessionChecker, (req, res) =>{

    if(!req.cookies.user_sid && req.session.user){
        res.render('login', {user: req.user,session: req.session.user})
    }else {
        res.render('create_job',{ session: req.session.user})


    }



})


exports.upload= upload.array('images');

// this module is the controller of CREATE job operation
exports.CreateJob= async (req, res, next)=>{
    const files = req.files;

   //console.log(req.body);
    let name =req.body.name
    let email =req.body.email
    let location = req.body.location
    let jobd = req.body.jobd
    let file_data=[];
    let file_name=[];
    req.files.forEach((item)=>{
        file_data.push(fs.readFileSync(path.join('uploads/' + item.filename)));
        file_name.push(item.filename);
    })
    let img =  {
        // data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
        file_name:file_name,
        data:file_data,
        contentType: 'image/png'
    }
    if(name !=''&& email !=''&& location  !='' && jobd !='' && img!=''){
        const job = new Job({
            subcontName:name,
            subcontEmail:email,
            jobLocation:location,
            jobDescription:jobd,
            img:img,

        })
            job.save()
        }else{
            res.render('dashboard', { session: req.session.user, jobs: {jobs}});
    }
    console.log('job data created')
    const jobs = await Job.find({})
    res.render('dashboard', { session: req.session.user, jobs: {jobs}});

}

// this module will render the edit job page
exports.UpdateJobPage= async (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    const job = await Job.findById({_id:id})
    res.render('edit_job', { session: req.session.user,job: {job}});

}
// this module is the controller of EDIT job operation
exports.UpdateJob=async (req, res)=>{

    try {
        const job = await Job.updateOne({
            id:req.params.id, 
            subcontName:req.body.name, 
            subcontEmail:req.body.email,
            jobLocation:req.body.location,
            jobDescription:req.body.jobd,})

            
        console.log(job)
        const jobs = await Job.find({})
        res.render('dashboard', { session: req.session.user,jobs: {jobs}})
    } catch (error) {
        console.log(error)

    }
}


// this module is the controller of DELETE job operation
exports.DeleteJob=async(req, res)=>{
    if(!req.cookies.user_sid && req.session.user){
        res.render('login',{ session: req.session.user})
    }
    console.log(req.params.id);
    const id = req.params.id;
    const job =await Job.deleteOne({ _id: id });
    console.log(job);
    const jobs = await Job.find({})
    res.render('dashboard', { session: req.session.user,jobs: {jobs}})

}
// this module will render the register user page
exports.RegisterPage=(req, res)=>{

    res.render('register',{ session: req.session.user });
}
//this module is the controller of CREATE user page
exports.RegisterUser= async (req,res)=>{
    // this part will hash the password
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    const hash = bcrypt.hashSync(req.body.password, salt);

    // this part will check if the email already exists in the database
    const user = await User.findOne({email:req.body.email})
    if (user){
        console.log(user)
        return res.status(400).json({email: "A user already registered"})
    }else {
    // if the email does not exist, it will create a new one and attach the above hashed pasword
        const newUser =new User({
            userName:req.body.name,
            email:req.body.email,
            password: hash,

        });
            newUser.save()
            res.render("login", {  session: req.session.user})
        }
    };

    // this module will render the login page
    exports.LoginPage = async (req,res)=>{
        res.render('login',{ session: req.session.user});

    }
    //login, this module will process the login method
    exports.LoginUser = async (req,res)=>{
        // first it will look into the database for a EMAIL match with the one from the user input
        const user =  await User.findOne({email:req.body.email})

        if (!user){
            
            res.render('login', { session: req.session.user})
            return;
        }
        // if the match is found, the next step is to compare the PASSWORD with the one from the database
        await user.comparePassword(req.body.password, async(error,match)=>{
            const jobs = await Job.find({})
            
            if (!match){
                console.log("fail")
                res.render("login", {  session: req.session.user})
                return;
            }
            // if both of them are successful it will let the user access the dashboard
                    req.session.user = user
                    res.render('dashboard', {  session: req.session.user, jobs:{jobs}})
                    console.log("success") 
        })
        
    }


    // this module is the  user logout controller which will clear the current cookies stored in the session.

    exports.LogoutUser= async(req,res)=>{
        console.log(req.cookies.user_sid)
        if(req.cookies.user_sid && req.session.user){
            res.clearCookie('user_sid')
            res.redirect('./login')
        }else{
            res.redirect('./login')
        }
        }
