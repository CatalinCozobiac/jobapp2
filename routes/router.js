const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

// Home page
router.get('/', userController.HomePage);

// About page
router.get('/about', userController.AboutPage);

//Job routes
// //Read
router.get('/dashboard', userController.DashBoard);
router.post('/dashboard', userController.DashBoard);

// //Create
router.get('/create_job', userController.CreatePage);
router.post('/create_job', userController.upload, userController.CreateJob);

// //Update
router.get('/edit_job/:id', userController.UpdateJobPage);
router.post('/edit_job/:id', userController.UpdateJob);



// //Delete
router.get('/delete_job/:id', userController.DeleteJob);


// User routes
// //Register
router.get('/register', userController.RegisterPage);
router.post('/register', userController.RegisterUser);

// //Login
router.get('/login', userController.LoginPage);
router.post('/login', userController.LoginUser);

// //Logout
router.get('/logout', userController.LogoutUser);

module.exports=router