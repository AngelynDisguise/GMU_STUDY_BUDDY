const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const { Users } = require("../models");

const bycrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const getAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    //console.log("Age is... ", age);
    return age;
}

//Display logged in user's profile info
router.get("/", async(req, res) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({
            where: {
                email: email,
            },
        });
        //user throwing error!?
        console.log(user);
        //res.json("yay", user);
        if (user) {
            //res.json(user);
            res.json("yay");
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


//Display all users' profile info
router.get("/userList", async(req, res) => {
    try {
        const listOfUsers = await Users.findAll();
        //res.json("yay!");
        console.log(listOfUsers);
        if (listOfUsers) {
            res.json(listOfUsers);
        } else {
            res.status(404).json({
                message: "No users found.",
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
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

//Register a new user's profile info
router.post("/register2", async(req, res) => {
    const { email, firstName, gender, major, date } = req.body;
    try {
        const user = await Users.findOne({
            where: {
                email: email,
            },
        });
        if (user) {
            await user.update({
                firstName: firstName,
                gender: gender,
                major: major,
                date: date,
            });
            await user.update({ age: getAge(date) });
            res.json(user);
        } else {
            //should not happen, since this gets called right after register
            res.json("User does not exist!");
        }
    } catch (err) {
        res.status(500).send(err);
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
            //Delete user in study buddy list (if found)
        } catch (err) {
            res.json("Error deleting user! :(");
            res.status(500).send(err);
        }
        res.json("User deleted successfully from all lists!");
    } else {
        res.json("User not found!");
    }
});

//Create match list by user preferences
router.post("/match", async(req, res) => {
    const { email, byGender, byMajor, byAge } = req.body; //get body of data being pass in
    console.log(req.body);
    console.log("byGender: ", byGender);
    console.log("byMajor: ", byMajor);
    console.log("byAge: ", byAge);
    //Find if user exists
    const user = await Users.findOne({
        where: {
            email: email,
        },
    });
    console.log(user);
    if (user) {
        //Create/update match list
        try {
            //let matchList = new Array();
            if (byGender && byMajor && byAge) {
                const matchbyAll = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        gender: user.gender,
                        major: user.major,
                        age: user.age,
                    },
                });
                await user.update({
                    numMatches: matchbyAll.length,
                    matchList: match,
                });
                res.json(matchbyAll);
                //matchList = matchbyAll;
                // matchList.push(matchbyAll);
                // matchList.concat(matchbyAll);
            } else if (byGender && byMajor) {
                const matchbyGenderMajor = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        gender: user.gender,
                        major: user.major,
                    }
                });
                await user.update({
                    numMatches: matchbyGenderMajor.length,
                    matchList: matchbyGenderMajor,
                });
                res.json(matchbyGenderMajor);
                //matchList = matchbyGenderMajor;
                // matchList.push(matchbyGenderMajor);
                // matchList.concat(matchbyGenderMajor);
            } else if (byGender && byAge) {
                const matchbyGenderAge = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        gender: user.gender,
                        age: user.age,
                    }
                });
                await user.update({
                    numMatches: matchbyGenderAge.length,
                    matchList: matchbyGenderAge,
                });
                res.json(matchbyGenderAge);
                //matchList = matchbyGenderAge;
                // matchList.push(matchbyGenderAge);
                // matchList.concat(matchbyGenderAge);
            } else if (byMajor && byAge) {
                const matchbyMajorAge = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        major: user.major,
                        age: user.age,
                    }
                });
                await user.update({
                    numMatches: matchbyMajorAge.length,
                    matchList: matchbyMajorAge,
                });
                res.json(matchbyMajorAge);
                //matchList = matchbyMajorAge;
                // matchList.push(matchbyMajorAge);
                // matchList.concat(matchbyMajorAge);
            } else if (byGender) {
                const matchbyGender = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        gender: user.gender,
                    }
                });
                await user.update({
                    numMatches: matchbyGender.length,
                    matchList: matchbyGender,
                });
                res.json(matchbyGender);
                //matchList = matchbyGender;
                // matchList.push(matchbyGender);
                // matchList.concat(matchbyGender);
            } else if (byMajor) {
                const matchbyMajor = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        major: user.major,
                    }
                });
                await user.update({
                    numMatches: matchbyMajor.length,
                    matchList: matchbyMajor,
                });
                res.json(matchbyMajor);
                //matchList = matchbyMajor;
                // matchList.push(matchbyMajor);
                // matchList.concat(matchbyMajor);
            } else if (byAge) {
                //console.log("User age: ", user.age);
                const matchbyAge = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        age: user.age,
                    }
                });
                await user.update({
                    numMatches: matchbyAge.length,
                    matchList: matchbyAge,
                });
                res.json(matchbyAge);
                //matchList = matchbyAge;
                // matchList.push(matchbyAge);
                // matchList.concat(matchbyAge);
                // console.log("Match By Age: ", matchbyAge.length);
                // console.log("Match List: ", matchList.length);
                //console.log("Match By Age: \n", matchbyAge);
                //console.log("Match List: \n", matchList);
            } else {
                //res.json("At least one preference must be selected!");
                res.status(400).send(err);
            }
            // console.log("Match List: \n", matchList);
            // await user.update({
            //     numMatches: matchList.length,
            //     matchList: matchList,
            // });
            //res.json(matchList);
        } catch (err) {
            //res.json("Error creating/updating match list! :(");
            res.status(500).send(err);
        }
        //console.log("Create match list successful!");
    } else {
        res.json("User not found!");
    }
});

//Create/update study buddy list

//middleware for server.js
module.exports = router;