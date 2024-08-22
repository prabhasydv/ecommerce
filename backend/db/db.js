const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://parbhasydv:Pr9971662250@ecommerce-website.6cnje.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce-website").then(() => {
    console.log("connection Succesfull")
}).catch((e)=>{
    console.log(e)
})