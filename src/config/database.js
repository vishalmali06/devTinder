// database.js

const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/devTinder';
const connectDB = async () => {
    await mongoose.connect(DB_URL);
};
module.exports = connectDB;
