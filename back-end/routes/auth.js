const express = require('express');
const User = require('../models/Users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();
const {body,validationResult} = require('express-validator');
const fetchuser = require('../middlewares/fetchuser');
const secretKey = "SiddhuIsAGoodBoy$$"
 //ROUTER 1:creating a user with end point "api/auth/createuser".no login required
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email id").isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min:5}),
],async (req,res)=>{
    //if there are errors return the bad request and the errors
    const errors = validationResult(req)
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()})
    }
    //check whether the user with given email already exits in the db
    try{
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({success,error:"Email id already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // .then(user=>res.json(user))
        // .catch(err => {console.log(err)
        //     res.json({error:'email id already exists'})
        // });
        const data = {
            user :{
                id : user.id
            }
        }
        success=true
        const authToken = jwt.sign(data,secretKey)
        res.json({success,"auth-token": authToken });
    }catch(err){
        console.error(error.message)
        res.status(500).send(false,"Some unkown error occured!!")
    }
})
//ROUTER 2:authenticating a user .END POINT POST "api/auth/login".No login required
router.post('/login',[
    body('email',"Enter a valid email id").isEmail(),
    body('password',"Password can not be empty").exists({min:5}),
],async (req,res)=>{
    //if there are errors return the bad request and the errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    //check whether the user with given email already exits in the db
    const {email,password} = req.body
    try{
        let success = false
        let user = await User.findOne({email})
        if(!user){
            success=false
            return res.status(400).json({success,error:"Please enter correct credentials"})
        }
        const comparePassword =await bcrypt.compare(password,user.password)
        if(!comparePassword){
            success=false
            return res.status(400).json({success,error:"Please enter correct credentials"})
        }
        const data = {
            user :{
                id : user.id
            }
        }
        const authToken = jwt.sign(data,secretKey)
        success = true
        res.json({success,authToken})
       
    }catch(err){
        console.error(error.message)
        res.status(500).send("Some unkown error occured!!")
    }
})
//ROUTER 3:Get logged in user details using  POST "api/auth/getUser".login required
router.post('/getUser',fetchuser,async (req,res)=>{
    try{
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send({user})
    }catch(err){
        console.error(error.message)
        res.status(500).send("Some unkown error occured!!")
    }
})
// ROUTER 4: Check if email already exists
router.get('/checkemail', async (req, res) => {
    const email = req.query.email;
    
    if (!email) {
        return res.status(400).json({ exists: false, error: "Email is required" });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports =  router