require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const DataBase = require("./Config/database");
const userRoutes = require("./Routes/user");
const userCoupon = require("./Routes/coupon");
const auth = require("./Routes/auth");
const wishlistRoutes = require("./Routes/wishlist");
require("./Config/Passport");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

// ✅ Connect to Database
DataBase();

// ✅ Session Configuration (ONLY ONCE)
app.use(session({
  secret: process.env.SESSION_SECRET || "fallback_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",  // Set `true` in production
    httpOnly: true,
    sameSite: "strict",
  },
}));

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());  // ✅ Required to persist login sessions

// ✅ CORS Setup
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Route Handling
app.use("/", userRoutes);
app.use("/", userCoupon);
app.use("/", wishlistRoutes);
app.use("/auth", auth); // ✅ Correct usage

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on PORT ${port}`);
});
