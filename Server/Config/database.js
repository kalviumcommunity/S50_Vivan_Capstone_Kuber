const mongoose = require("mongoose");
require('dotenv').config();

const URI = process.env.MongoDB_URL;

const connect_database = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected Successfully");
    } catch (error) {
        console.error("error Connecting :", error);
        throw error;
    }
};

module.exports = connect_database;