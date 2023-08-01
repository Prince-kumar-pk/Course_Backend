const express = require('express');
const router = express.Router();
const verify = require('../authverify')
const bcrypt = require('bcryptjs')
const Model = require('../module/module');
const User = require('../module/User')
const jwt  = require('jsonwebtoken')


//register

router.post('/registerUser', async (req, res) => {

    const emailExixt = await User.findOne({email : req.body.email})
    if (emailExixt) {
        res.status(400).json("emai id already exist")
        return
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.pass, salt)

    const newUser = new User({
        userId: req.body.userId,
        email: req.body.email,
        profileLink: req.body.profileLink,
        pass: hashedPass
    })

    try {

        const result = await newUser.save()
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)
    }

})

//login

router.post('/loginUser', async (req, res) => {

    const user = await User.findOne({email : req.body.email})
    if (!user) {
        res.status(400).json("wrong email")
        return
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.pass, salt)

    const validPassword  = await bcrypt.compare(req.body.pass, user.pass)

    if(validPassword){
        const token = jwt.sign({__id: user.id}, process.env.Token_Secret)
        res.header("token", token).send(token)
    } else {
        res.status(400).json("wrong password")
    }

    })



//POST

router.post('/createPost', async (req,res)=>{
//    res.send(" Post API");
const newPost = new Model(
    {
        tagName: req.body.tagName,
        courseImg : req.body.courseImg,
        discription : req.body.discription,
        date : req.body.date,
        duration : req.body.duration,
        vidLink : req.body.vidLink,
        profile : req.body.profile,
        insname : req.body.insname
    }
)

try {
    const result = await newPost.save();
    res.status(200).json(result);
    
} catch (error) {
    res.status(400).json(error);
}


})

//GET All Post
router.get('/getAllPost', async (req,res)=>{
  
    try {
        const result = await Model.find();
        res.status(200).json(result);
    } catch (error) {
    res.status(500).json(error);
    }
})

//Get Post through Id
router.get('/getPost/:id', async (req,res)=>{
   
    try {
        const result = await Model.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
    res.status(500).json(error);
    }


})

//PATCH


//DELETE





module.exports = router;