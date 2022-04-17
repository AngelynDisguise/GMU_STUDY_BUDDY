const express = require("express");
const router = express.Router();
const { StudyBuddy } = require("../models");

//List all users in study buddy list
router.get("/", async(req, res) => {
    const listOfUsers = await StudyBuddy.findAll();
    res.json(listOfUsers);
});

//Add a new user to study buddy list
router.post("/add", async(req, res) => {
    const { email } = req.body; //get body of data being pass in
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        res.json("User already exists!");
    } else {
        try {
            const newUser = await StudyBuddy.create({ email: email });
            res.json(newUser);
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

//Remove an existing study buddy from list
router.post("/remove", async(req, res, next) => {
    const { email } = req.body; //get body of data being pass in
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        try {
            StudyBuddy.destroy({
                where: {
                    email: email,
                }
            });
            res.json("User deleted successfully!");
        } catch (err) {
            res.json("Error deleting user! :(");
            res.status(500).send(err);
        }
    } else {
        res.json("User not found!");
    }
});


//middleware for server.js
module.exports = router;