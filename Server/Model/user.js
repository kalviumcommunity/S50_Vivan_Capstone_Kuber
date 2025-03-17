const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    User_Name: String,
    Email: String,
    Password: String,
    google_id: String,
    coupons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
    }]
});

const usermodel = mongoose.model("USER_DETAIL", userSchema);
module.exports = usermodel;
