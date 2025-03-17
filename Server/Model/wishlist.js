const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER_DETAIL", 
    required: true,
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
    required: true,
  },
});

module.exports = mongoose.model("Wishlist", WishlistSchema);