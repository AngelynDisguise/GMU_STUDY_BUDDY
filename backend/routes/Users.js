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
        console.log(user);
        if (user) {
            res.json(user);
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
        res.json(listOfUsers);
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
    //console.log(user);
    if (user) {
        //Create/update match list
        try {
            const matchList = new Array();
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
                // matchList.push(matchbyAll);
                matchList.concat(matchbyAll);
                // matchList[matchList.length] = matchbyAll;
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
                // matchList.push(matchbyGenderMajor);
                matchList.concat(matchbyGenderMajor);
                // matchList[matchList.length] = matchbyGenderMajor;
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
                // matchList.push(matchbyGenderAge);
                matchList.concat(matchbyGenderAge);
                // matchList[matchList.length] = matchbyGenderAge;
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
                // matchList.push(matchbyMajorAge);
                matchList.concat(matchbyMajorAge);
                // matchList[matchList.length] = matchbyMajorAge;
            } else if (byGender) {
                const matchbyGender = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        gender: user.gender,
                    }
                });
                // matchList.push(matchbyGender);
                matchList.concat(matchbyGender);
                // matchList[matchList.length] = matchbyGender;
            } else if (byMajor) {
                const matchbyMajor = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        major: user.major,
                    }
                });
                // matchList.push(matchbyMajor);
                matchList.concat(matchbyMajor);
                // matchList[matchList.length] = matchbyMajor;
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
                // console.log("Match user age: ", matchbyAge);
                // matchList.push(matchbyAge);
                matchList.concat(matchbyAge);
                console.log(matchList.concat(matchbyAge));
                console.log(matchbyAge.concat(matchList));
                // matchList[matchList.length] = matchbyAge;
                //console.log(typeof matchbyAge);
                console.log("MATCH BY AGE\n", matchbyAge);
                //console.log(typeof matchbyAge);
                console.log("MATCH LIST\n", matchList);
            }
            console.log("Num matches: ", matchList.length);
            console.log("Type of Match List: ", typeof matchList);
            await user.update({
                numMatches: matchList.length,
                matchList: matchList,
            });
            //res.json("yay!");
            res.json(matchList);
        } catch (err) {
            res.json("Error creating/updating match list! :(");
            res.status(500).send(err);
        }
        console.log("Create match list successful!");
    } else {
        res.json("User not found!");
    }
});

//Create/update study buddy list

//middleware for server.js
module.exports = router;