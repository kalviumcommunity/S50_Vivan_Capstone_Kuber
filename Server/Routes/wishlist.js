const express = require("express");
const router = express.Router();
const Wishlist = require("../Model/wishlist");
const Coupon = require("../Model/coupon");

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  }
  

router.post("/wishlist", isAuthenticated, async (req, res) => {
  try {
    const { userId, couponId } = req.body;
    
    if (!userId || !couponId) {
      return res.status(400).json({ message: "Missing userId or couponId" });
    }

    console.log(`✅ Adding coupon (${couponId}) to wishlist for user (${userId})`);

    const existingItem = await Wishlist.findOne({ user: userId, coupon: couponId });
    if (existingItem) {
      return res.status(400).json({ message: "Coupon already in wishlist" });
    }

    const wishlistItem = new Wishlist({ user: userId, coupon: couponId });
    await wishlistItem.save();

    console.log("✅ Wishlist item saved:", wishlistItem);
    res.status(201).json({ message: "Coupon added to wishlist" });

  } catch (error) {
    console.error("🔥 Error adding to wishlist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/wishlist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("🔍 Fetching wishlist for user:", userId);

    const wishlistItems = await Wishlist.find({ user: userId }).populate("coupon");

    if (!wishlistItems.length) {
      return res.status(404).json({ message: "No wishlist items found" });
    }

    console.log("✅ Wishlist items fetched:", wishlistItems);
    res.json(wishlistItems);

  } catch (error) {
    console.error("🔥 Error fetching wishlist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Remove item from wishlist
router.delete("/wishlist/:userId/:couponId", async (req, res) => {
  try {
    const { userId, couponId } = req.params;

    console.log(`🗑 Removing coupon (${couponId}) from wishlist for user (${userId})`);

    const deletedItem = await Wishlist.findOneAndDelete({ user: userId, coupon: couponId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Coupon not found in wishlist" });
    }

    console.log("✅ Coupon removed from wishlist:", deletedItem);
    res.json({ message: "Coupon removed from wishlist" });

  } catch (error) {
    console.error("🔥 Error removing from wishlist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



  
module.exports = router;
