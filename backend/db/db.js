require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((e) => {
        console.log("Error connecting to the database", e);
    });
