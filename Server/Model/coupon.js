const mongoose=require("mongoose")

const CouponSchema = new mongoose.Schema({
    Brand_Name: String,
    Date: Date,
    Price: Number,
    Description: String,
    Code: String,
});

const couponmodel =mongoose.model("COUPON_DETAIL",CouponSchema)

module.exports ={couponmodel};



