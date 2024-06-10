const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    Brand_Name: {
        type: String,
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
    image: {
        type: String,
    },
});

const Coupon = mongoose.model("Coupon", CouponSchema);

module.exports = { couponmodel: Coupon };
