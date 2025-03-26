const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Namste Vishal");
});

app.get("/test", (req, res) => {
    res.send("Hello test Server!!");
});

app.get("/hello", (req, res) => {
    res.send("Hello hello");
});

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
});
