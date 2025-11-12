// database.js
const mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://vishalmali06:lsgTbSbkeqNXj98J@namastenode.ypdqp.mongodb.net/devTinder';
const connectDB = async () => {
    await mongoose.connect(DB_URL);
};
module.exports = connectDB;
