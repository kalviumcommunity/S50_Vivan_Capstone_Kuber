const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../Model/user");

// ✅ Redirect user to Google for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google/failure" }),
  async function (req, res) {
    try {
      console.log("✅ Google login successful:", req.user);

      // ✅ Ensure user ID is stored in session
      req.session.userId = req.user.profile._id;
      console.log("✅ Stored in session:", req.session.userId);

      // ✅ Redirect to frontend with user ID
      res.redirect(`http://localhost:5173/mainpage?userId=${req.user.profile._id}`);
    } catch (error) {
      console.error("🔥 Error handling Google authentication:", error);
      res.status(500).send("Internal server error");
    }
  }
);


// ✅ Logout user
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).send("Error during logout");
    }
    req.session.destroy(function (err) {
      if (err) {
        return res.status(500).send("Error destroying session");
      }
      res.send("User logged out successfully");
    });
  });
});


// ✅ Ensure authentication before returning user info
router.get("/user", async (req, res) => {
    try {
        console.log("🔍 Checking user authentication...");

        // ✅ Check if user is logged in via session
        if (!req.user && !req.session.userId) {
            console.log("❌ User not logged in");
            return res.status(401).json({ message: "User not logged in" });
        }

        // ✅ If user exists in session, fetch user from database
        const userId = req.user?._id || req.session.userId;
        console.log("✅ Authenticated User ID:", userId);

        const user = await User.findById(userId).select("-Password");
        if (!user) {
            console.log("❌ User not found in database");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ User found:", user._id);
        res.json({ userId: user._id, name: user.User_Name });

    } catch (error) {
        console.error("🔥 Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
});

module.exports = router;
