require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const DataBase = require("./config/database");
const user = require('./Routes/user');

DataBase();
app.use(express.json());
app.use('/',user);

app.listen(port, () => {
    console.log(`🚀Server running on PORT🚀 ${port}`);
});
