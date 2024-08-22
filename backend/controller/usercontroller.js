const { compare } = require("bcryptjs")
const { hashpassword } = require("../middleware/helper")
const Usermodel = require("../models/usermodels")
const Ordermodel = require("../models/Ordermodel")


// register route funtion

exports.register = async(req, res) => {
    try {

        const {name, email , phone, password, secretanswer, address} = req.body
        if(!name || !email || !phone || !password || !secretanswer || !address){
            return res.status(201).send("plz filled all fields")
        }
        const userexist = await Usermodel.findOne({email})
        if(userexist){
            return res.status(200).send("user already exist")
        }
        const hash = await hashpassword(password)
        const newuser = new Usermodel({name, email, phone, password:hash, secretanswer, address})
        const usersave = await newuser.save()
        res.status(200).send({message:"user register succesfully",usersave})
        
    } catch (error) {
        res.status(400).send({message: "user register faild "},error)
    }
}

// Login route funtion

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body 
        if(!email || !password){
        return res.status(201).send({message:"plz filled all your fields"})
        }
        const user = await Usermodel.findOne({email})
        if(!user){
        return res.status(201).send({message:"user doesn't exist , plz Signup first"})
        }
        const match = await compare(password,user.password)
        if (!match) {
        return res.status(201).send({message:"invalid password"})
        }   
        const token = await user.generatetoken()
        res.status(200).send({message:"user login succesfully", token,user})

    } catch (error) {
        res.status(400).send({message:"user login failed", error})
    }
}

// Forgot password route funtion 

exports.forgotpassword = async (req, res) => {
    try {
        const { email, secretanswer, newpassword } = req.body
        if (!email || !secretanswer || !newpassword) {
            return res.status(400).send({ message: 'Please fill in all the fields' })
        }
        const user = await Usermodel.findOne({ email: email, secretanswer: secretanswer })
        if (!user) {
            return res.status(400).send({ message: 'User does not exist, please signup' })
        }
        const hash = await hashpassword(newpassword)
        const updatepassword = await Usermodel.findByIdAndUpdate(user._id, { password: hash }, { new: true })
        res.status(200).send({ message: "Password reset successfully" })

    } catch (error) {
        res.status(400).send({ message: "Forgot password failed", error })
    }
}

//edit user
exports.edituser = async(req, res) => {
    try {
        const {name, email, phone, address} = req.body
        if(!name || !email || !phone || !address){
            return res.status(400).send({message:"pls filled all fields"})
        }
        const updateuser = await Usermodel.findByIdAndUpdate(req.user._id,{name,email,phone,address},{new:true})
        res.status(200).send({message:"user update succesfully",updateuser})

    } catch (error) {
        res.send(400).send({message:"user update failed",error})
    }
}

// user order function
exports.getorderfunction = async(req, res)=>{
    try {
        const orders = await Ordermodel.find({buyer:req.user._id}).populate("products").populate("buyer","name")
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send(error)
    }
}

// admin order function
exports.getallorderfunction = async (req, res) => {
    try {
        const orders = await Ordermodel.find({}).populate("products").populate("buyer", "name").sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

// order status function
exports.orderstatusfunction = async(req, res)=>{
    try {
        const {id} = req.params
        const {status} = req.body
        const orders = await Ordermodel.findByIdAndUpdate(id,{status},{new:true})
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error)
    }
}