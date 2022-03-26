const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", (req, res) => {
    res.json("Hello World");
});

router.post("/", async(req, res) => {
    const user = req.body;
    try {
        await Users.create(user);
    } catch (error) {
        console.log(":(");
    }
    res.json(user);
});

//middleware for server.js
module.exports = router;