const express = require("express");
const router = express.Router();
const { StudyBuddy } = require("../models");

//List all users
router.get("/", async(req, res) => {
    const listOfUsers = await StudyBuddy.findAll();
    res.json(listOfUsers);
});

//Added a new user
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

//Remove an existing user
router.post("/remove", async(req, res, next) => {
    const { email } = req.body; //get body of data being pass in
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        StudyBuddy.destroy({
            where: {
                email: email,
            }
        });
        res.json("User deleted successfully!");
    } else {
        res.json("User not found!");
    }
});

//Update an existing user
router.post("/updatedate", async(req, res, next) => {
    const { email, date} = req.body; //get body of data being pass in
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        await StudyBuddy.update({ date: date }, {
            where: {
                email: email,
            },
        });
        res.json("Update successful!");
    } else {
        res.json("User not found!");
    }
});
//Update an existing user
router.post("/updatename", async(req, res, next) => {
    const { email, firstName} = req.body; //get body of data being pass in
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        await StudyBuddy.update({ firstName: firstName }, {
            where: {
                email: email,
            },
        });
        res.json("Update successful!");
    } else {
        res.json("User not found!");
    }
});
//Update an existing user
router.post("/updategender", async(req, res, next) => {
    const { email, gender} = req.body; //get body of data being pass in
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        await StudyBuddy.update({ gender: gender }, {
            where: {
                email: email,
            },
        });
        res.json("Update successful!");
    } else {
        res.json("User not found!");
    }
});
//Update an existing user
router.post("/updatemajor", async(req, res, next) => {
    const { email, major} = req.body; //get body of data being pass in
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        await StudyBuddy.update({ major: major }, {
            where: {
                email: email,
            },
        });
        res.json("Update successful!");
    } else {
        res.json("User not found!");
    }
});

//middleware for server.js
module.exports = router;