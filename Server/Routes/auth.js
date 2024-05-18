const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../Model/user");


router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/mainpage",
    failureRedirect: "http://localhost:5173",
  }),
);

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


// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/google/failure" }),
//   async function (req, res) {
//     try {
//       // Handle successful authentication
//       res.redirect("/profile");
//     } catch (error) {
//       console.error("Error handling Google authentication callback:", error);
//       res.status(500).send("Internal server error");
//     }
//   }
// );


module.exports = router;