const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    Brand_Name: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    Code: {
        type: String,
        required: true,
    },
    Link: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    }
});

const Coupon = mongoose.model("Coupon", CouponSchema);
module.exports = Coupon;