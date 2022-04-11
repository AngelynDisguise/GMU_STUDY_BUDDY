const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bycrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

//Display logged in user's profile
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
                // res.json(newUser);
                res.json("Registration successful!");
            } catch (err) {
                res.json("Error occured! :(");
                res.status(500).send(err);
            }
        });
    } else {
        res.json("User already exists!");
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
            const token = sign({ email: user.email, id: user.id }, "secret");
            res.json("Login successful!");
            //res.json(token);
        } else {
            res.json("Incorrect Password!");
        }
    } else {
        res.json("Email not found - please register!");
    }
});

//middleware for server.js
module.exports = router;