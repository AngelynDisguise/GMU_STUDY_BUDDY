const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bycrypt = require("bcrypt");

//List all users
router.get("/", async(req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

//Register a new user
router.post("/register", async(req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({
        where: {
            email: email,
        },
    });
    if (user === null) {
        bycrypt.hash(password, 10).then(async(hash) => {
            try {
                const newUser = await Users.create({
                    email: email,
                    password: hash,
                });
                res.json(newUser);
            } catch (err) {
                res.status(500).send(err);
            }
        });
    } else {
        res.json("User already exists.");
    }
});

//Login an existing user
router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        const isMatch = await bycrypt.compare(password, user.password);
        if (isMatch) {
            res.json("Login Success");
        } else {
            res.json("Incorrect Password");
        }
    } else {
        res.json("Email not found - please register!");
    }
});

//middleware for server.js
module.exports = router;