const express = require("express");
const router = express.Router();
const { Users, StudyBuddy, MatchList } = require("../models");

const bycrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

//Display logged in user's profile info
router.get("/getUser", async(req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        res.json(user);
    }
});


//Display all users' profile info
router.get("/getUsers", async(res) => {
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
                const token = sign({ email: newUser.email, password: newUser.password }, "secret");
                // res.json(token);
                res.json("Registration successful!");
            } catch (err) {
                res.json("Error registering user! :(");
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
        try {
            const isMatch = await bycrypt.compare(password, user.password);
            if (isMatch) {
                const token = sign({ email: user.email, id: user.id }, "secret");
                //res.json("Login successful!");
                res.json(token);
            } else {
                res.json("Incorrect Password!");
            }
        } catch (err) {
            res.json("Error logging in user! :(");
            res.status(500).send(err);
        }
    } else {
        res.json("Email not found - please register!");
    }
});

//Remove an existing user in all lists
router.post("/remove", async(req, res) => {
    const { email } = req.body; //get body of data being pass in
    //Find if user exists
    const user = await Users.findOne({
        where: {
            email: email,
        },
    });
    //Delete user in user list
    if (user) {
        try {
            Users.destroy({
                where: {
                    email: email,
                }
            });
            console.log("User deleted from user list!");

            //Delete user in match list (if found)
            const match = await MatchList.findOne({
                where: {
                    email: email,
                },
            });
            if (match) {
                await MatchList.destroy({
                    where: {
                        email: email,
                    }
                });
                console.log("User deleted from match list!");

                //Delete user in study buddy list (if found)
                const studyBuddy = await StudyBuddy.findOne({
                    where: {
                        email: email,
                    },
                });
                if (studyBuddy) {
                    await StudyBuddy.destroy({
                        where: {
                            email: email,
                        },
                    });
                    console.log("User deleted from study buddy list!");
                }
            }
        } catch (err) {
            res.json("Error deleting user! :(");
            res.status(500).send(err);
        }
        res.json("User deleted successfully from all lists!");
    } else {
        res.json("User not found!");
    }
});

//Update an existing user's PASSWORD in all lists
router.post("/updatePassword", async(req, res) => {
    const { email, password } = req.body; //get body of data being pass in
    //Find if user exists
    const user = await Users.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        //Update user's password
        bycrypt.hash(password, 10).then(async(hash) => {
            try {
                await user.update({ password: hash });
                console.log("Successfully updated user's password!");

                //Update Match user, if it exists
                const match = await MatchList.findOne({
                    where: {
                        email: email,
                    },
                });
                if (match) {
                    await MatchList.update({ password: hash });
                    console.log("Successfully updated match's password!");

                    //Update StudyBuddy user, if it exists
                    const studyBuddy = await StudyBuddy.findOne({
                        where: {
                            email: email,
                        }
                    });
                    if (studyBuddy) {
                        await studyBuddy.update({ password: hash });
                        console.log("Successfully updated study buddy's password!");
                    }
                }
            } catch (err) {
                res.json("Error updating password! :(");
                res.status(500).send(err);
            }
        });
        res.json("Update password successful in all lists!");
    } else {
        res.json("User not found!");
    }
});


//Update an existing user's DOB
router.post("/updateDate", async(req, res) => {
    const { email, date } = req.body; //get body of data being pass in
    //Find if user exists
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        //Update user's DOB
        try {
            await user.update({ date: date });
            console.log("Successfully updated user's DOB!");

            //Update Match user's DOB, if it exists
            const match = await MatchList.findOne({
                where: {
                    email: email,
                },
            });
            if (match) {
                await MatchList.update({ date: date });
                console.log("Successfully updated match's DOB!");

                //Update StudyBuddy user's DOB, if it exists
                const studyBuddy = await StudyBuddy.findOne({
                    where: {
                        email: email,
                    }
                });
                if (studyBuddy) {
                    await studyBuddy.update({ date: date });
                    console.log("Successfully updated study buddy's DOB!");
                }
            }
        } catch (err) {
            res.json("Error updating DOB! :(");
            res.status(500).send(err);
        }
        res.json("Update date successful in all lists!");
    } else {
        res.json("User not found!");
    }
});

//Update an existing user's GENDER
router.post("/updateGender", async(req, res) => {
    const { email, gender } = req.body; //get body of data being pass in
    //Find if user exists
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        //Update user's gender
        try {
            await user.update({ gender: gender });
            console.log("Successfully updated user's gender!");

            //Update Match user's gender, if it exists
            const match = await MatchList.findOne({
                where: {
                    email: email,
                },
            });
            if (match) {
                await MatchList.update({ gender: gender });
                console.log("Successfully updated match's gender!");

                //Update StudyBuddy user's gender, if it exists
                const studyBuddy = await StudyBuddy.findOne({
                    where: {
                        email: email,
                    }
                });
                if (studyBuddy) {
                    await studyBuddy.update({ gender: gender });
                    console.log("Successfully updated study buddy's gender!");
                }
            }
        } catch (err) {
            res.json("Error updating gender! :(");
            res.status(500).send(err);
        }
        res.json("Update gender successful in all lists!");
    } else {
        res.json("User not found!");
    }
});


//Update an existing user's first name
router.post("/updateFirstName", async(req, res) => {
    const { email, firstName } = req.body; //get body of data being pass in
    //Find if user exists
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        //Update user's first name
        try {
            await user.update({ firstName: firstName });
            console.log("Successfully updated user's first name!");

            //Update Match user's first name, if it exists
            const match = await MatchList.findOne({
                where: {
                    email: email,
                },
            });
            if (match) {
                await MatchList.update({ firstName: firstName });
                console.log("Successfully updated match's first name!");

                //Update StudyBuddy user's first name, if it exists
                const studyBuddy = await StudyBuddy.findOne({
                    where: {
                        email: email,
                    }
                });
                if (studyBuddy) {
                    await studyBuddy.update({ firstName: firstName });
                    console.log("Successfully updated study buddy's first name!");
                }
            }
        } catch (err) {
            res.json("Error updating first name! :(");
            res.status(500).send(err);
        }
        res.json("Update first name successful in all lists!");
    } else {
        res.json("User not found!");
    }
});


//Update an existing user's MAJOR
router.post("/updateMajor", async(req, res) => {
    const { email, major } = req.body; //get body of data being pass in
    //Find if user exists
    const user = await StudyBuddy.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        //Update user's major
        try {
            await user.update({ major: major });
            console.log("Successfully updated user's major!");

            //Update Match user's major, if it exists
            const match = await MatchList.findOne({
                where: {
                    email: email,
                },
            });
            if (match) {
                await MatchList.update({ major: major });
                console.log("Successfully updated match's major!");

                //Update StudyBuddy user's major, if it exists
                const studyBuddy = await StudyBuddy.findOne({
                    where: {
                        email: email,
                    }
                });
                if (studyBuddy) {
                    await studyBuddy.update({ major: major });
                    console.log("Successfully updated study buddy's major!");
                }
            }
        } catch (err) {
            res.json("Error updating study buddy! :(");
            res.status(500).send(err);
        }
        res.json("Update major successful in all lists!");
    } else {
        res.json("User not found!");
    }
});

//middleware for server.js
module.exports = router;