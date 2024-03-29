const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
    User_Name: String,
    Email: String,
    Password: String
});

const usermodel =mongoose.model("USER_DETAIL",userSchema)

module.exports ={usermodel};