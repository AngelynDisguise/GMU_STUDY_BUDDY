const express = require("express");
const router = express.Router();
const { MatchList } = require("../models");

//List all users
router.get("/", async(req, res) => {
    const listOfUsers = await MatchList.findAll();
    res.json(listOfUsers);
});

//Added a new user
router.post("/add", async(req, res) => {
    const { firstName, gender, major} = req.body; //get body of data being pass in
    const user = await MatchList.findOne({
        where: {
            firstName: firstName,
        },
    });
    if (user) {
        res.json("User already exists!");
    } else {
        try {
            const newUser = await MatchList.create({ firstName: firstName, gender: gender, major: major, });
            res.json(newUser);
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

//Remove an existing user
router.post("/remove", async(req, res, next) => {
    const { firstName } = req.body; //get body of data being pass in
    const user = await MatchList.findOne({
        where: {
            firstName: firstName,
        },
    });
    if (user) {
        MatchList.destroy({
            where: {
                firstName: firstName,
            }
        });
        res.json("User deleted successfully!");
    } else {
        res.json("User not found!");
    }
});
//middleware for server.js
module.exports = router;