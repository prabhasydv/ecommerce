const mongoose = require("mongoose")

const Orderschema = new mongoose.Schema({
    products:[
        {
            type:mongoose.ObjectId,
            ref:"Product",
        }
    ],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","Shipped","Delivered","Cancel"],
    },
},{timestamps:true})

const Ordermodel = mongoose.model("Order",Orderschema)

module.exports =Ordermodel