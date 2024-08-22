const Usermodel = require("../models/usermodels");
const jwt = require("jsonwebtoken");
require("dotenv").config()

// userLogin auth
exports.authlogin =(req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization,process.env.KEY)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "pls login first"})
    }
}


// user admin panel
exports.Admin = async(req, res, next) => {
    try {
        const user = await Usermodel.findById(req.user._id)
        if(user.role!=1){
        return res.status(400).send({message: "unauthorized access"})   
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "unauthorized access"})   

    }
}
