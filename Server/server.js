require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const DataBase = require("./config/database");
const userRoutes = require('./Routes/user');
const userCoupon = require('./Routes/coupon');
const cors = require('cors');


DataBase();
app.use(cors());
app.use(express.json());
app.use('/', userRoutes);
app.use('/', userCoupon);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on PORT ${port}`);
});
