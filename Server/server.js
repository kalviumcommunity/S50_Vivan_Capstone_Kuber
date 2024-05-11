require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const DataBase = require("./Config/database");
const userRoutes = require("./Routes/user");
const userCoupon = require("./Routes/coupon");
const auth = require("./Routes/auth");
// const CLIENT_ID = process.env.CLIENT_ID;
require("./Config/Passport");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
DataBase();

app.use(session({
  secret: "cATS",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))

app.use(express.json());
app.use("/", userRoutes);
app.use("/", userCoupon);
app.use("/auth", auth);

// app.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   res.status(status).json({
//     error: {
//       message: err.message || "Internal Server Error",
//     },
//   });
// });


app.listen(port, () => {
  console.log(`🚀 Server running on PORT ${port}`);
});
