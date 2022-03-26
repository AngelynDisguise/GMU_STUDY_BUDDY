const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", (req, res) => {
    res.json("Hello World");
});

//middleware for server.js
module.exports = router;