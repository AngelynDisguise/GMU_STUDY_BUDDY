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
        //console.log(user);
        if (user) {
            res.json(user);
        } else {
            res.status(500).json("User does not exist!");
        }
    } catch (err) {
        res.status(500).json("Error retrieving user info! :(");
    }
});


//Display all users' profile info
router.get("/userList", async(req, res) => {
    try {
        const listOfUsers = await Users.findAll();
        //console.log(listOfUsers);
        if (listOfUsers) {
            res.json(listOfUsers);
        } else {
            res.status(500).json("No users found!");
        }
    } catch (err) {
        res.status(500).json("Error fetching users list! :(");
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
                res.json(token);
                //res.json("Registration successful!");
            } catch (err) {
                res.status(500).json("Error registering user! :(");
            }
        });
    } else {
        res.status(400).json("User already exists!");
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
            res.status(500).json("User does not exist!");
        }
    } catch (err) {
        res.status(500).json("Error updating user profile!");
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
                res.status(400).json("Incorrect Password!");
            }
        } catch (err) {
            res.status(500).json("Error logging in user! :(");
        }
    } else {
        res.status(400).json("Email not found - please register!");
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
    if (user) {
        try {
            //Delete user in user list
            await Users.destroy({
                where: {
                    email: email,
                }
            });

            // Find all users and remove user from all lists
            // (User list should not be empty if user exists)
            const listOfUsers = await Users.findAll();
            // console.log(listOfUsers);
            for (let i = 0; i < listOfUsers.length; i++) {
                //Delete user in all match lists (if found)
                //Find user's match list, if it exists
                const matchList = listOfUsers[i].matchList;
                if (matchList) {
                    //Find if user exists in match list
                    const matchIndex = matchList.indexOf(email);
                    if (matchIndex > -1) {
                        //Remove user from match list
                        matchList.splice(matchIndex, 1);
                        //update user's match list
                        //await listOfUsers[i].update({ matchList: matchList });
                        await Users.update({
                            numMatches: matchList.length,
                            matchList: matchList,
                        }, {
                            where: {
                                email: listOfUsers[i].email,
                            }
                        });
                        console.log("User removed from ${listOfUsers[i].firstName}'s match list!");
                    }
                    //console.log("match list found");
                } else {
                    console.log("No match list found for ${listOfUsers[i].firstName}");
                }

                //Delete user in all study buddy lists (if found)
                //Find user's study buddy list, if it exists
                const studyBuddyList = listOfUsers[i].studyBuddyList;
                if (studyBuddyList) {
                    //Find if user exists in match list
                    const studyBuddyIndex = studyBuddyList.indexOf(email);
                    if (studyBuddyIndex > -1) {
                        //Remove user from match list
                        studyBuddyList.splice(studyBuddyIndex, 1);
                        //update user's match list
                        //await studyBuddyList[i].update({ studyBuddyList: studyBuddyList });
                        await Users.update({
                            numStudyBuddies: studyBuddyList.length,
                            studyBuddyList: studyBuddyList,
                        }, {
                            where: {
                                email: listOfUsers[i].email,
                            }
                        });
                    } else {
                        console.log("User removed from ${listOfUsers[i].firstName}'s study buddy list!");
                    }
                } else {
                    console.log("No study buddy list found for ${listOfUsers[i].firstName}");
                }
                console.log("hello ", i);
            }
            res.json("User deleted successfully from all lists!");
        } catch (err) {
            res.status(500).json("Error deleting user! :(");
        }
    } else {
        res.status(400).json("User not found!");
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
        try {
            //Save user preferences
            const preferences = new Array();
            preferences.push({ byGender: byGender });
            preferences.push({ byMajor: byMajor });
            preferences.push({ byAge: byAge });
            //console.log(preferences);
            await user.update({
                preferences: preferences,
            });

            //Create/update match list
            let matchList = new Array();
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
                //Add every JSON object's email to matchList
                matchbyAll.forEach(match => {
                    matchList.push(match.email);
                });
                //Add every JSON object to matchList
                //matchList = matchbyAll;
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
                //Add every JSON object's email to matchList
                matchbyGenderMajor.forEach(match => {
                    matchList.push(match.email);
                });
                //Add every JSON object to matchList
                //matchList = matchbyGenderMajor;
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
                //Add every JSON object's email to matchList
                matchbyGenderAge.forEach(match => {
                    matchList.push(match.email);
                });
                //Add every JSON object to matchList
                //matchList = matchbyGenderAge;
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
                //Add every JSON object's email to matchList
                matchbyMajorAge.forEach(match => {
                    matchList.push(match.email);
                });
                //Add every JSON object to matchList
                //matchList = matchbyMajorAge;
            } else if (byGender) {
                const matchbyGender = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        gender: user.gender,
                    }
                });
                //Add every JSON object's email to matchList
                matchbyGender.forEach(match => {
                    matchList.push(match.email);
                });
                //Add every JSON object to matchList
                //matchList = matchbyGender;
            } else if (byMajor) {
                const matchbyMajor = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        major: user.major,
                    }
                });
                //Add every JSON object's email to matchList
                matchbyMajor.forEach(match => {
                    matchList.push(match.email);
                });
                //Add every JSON object to matchList
                //matchList = matchbyMajor;
            } else if (byAge) {
                const matchbyAge = await Users.findAll({
                    where: {
                        email: {
                            [Op.ne]: user.email,
                        },
                        age: user.age,
                    }
                });
                //Add every JSON object's email to matchList
                matchbyAge.forEach(match => {
                    matchList.push(match.email);
                });
                //Add every JSON object to matchList
                //matchList = matchbyAge;
            }
            const numMatches = matchList.length;
            //console.log("Match List: \n", matchList);
            await user.update({
                numMatches: numMatches,
                matchList: matchList,
            });
            res.json(user.matchList);
            console.log("Create match list successful!");
        } catch (err) {
            res.status(500).json("Error creating/updating match list! :(");
        }
    } else {
        res.status(400).json("User not found!");
    }
});

//Create/update study buddy list
router.post("/addStudyBuddy", async(req, res) => {
    const { userEmail, studyBuddyEmail } = req.body; //get body of data being pass in
    //Check if user and study buddy exist
    const user = await Users.findOne({
        where: {
            email: userEmail,
        },
    });
    const studyBuddy = await Users.findOne({
        where: {
            email: studyBuddyEmail,
        },
    });
    if (user && studyBuddy) {
        //Create or update study buddy list
        if (userEmail === studyBuddyEmail) {
            res.status(400).json("You cannot add yourself to study buddy list!");
        } else {
            try {
                let currentStudyBuddyList = new Array();
                //Check if study buddy list already exists
                if (user.studyBuddyList) {
                    currentStudyBuddyList = user.studyBuddyList;
                }
                //Check if study buddy already in study buddy list
                if (currentStudyBuddyList.indexOf(studyBuddyEmail) > -1) {
                    res.status(400).json("Study buddy already in study buddy list!");
                } else {
                    console.log("Before add: ", user.studyBuddyList);
                    //Add study buddy to study buddy list
                    currentStudyBuddyList.push(studyBuddyEmail);
                    const numStudyBuddies = currentStudyBuddyList.length;
                    //Update study buddy list
                    await Users.update({
                        studyBuddyList: currentStudyBuddyList,
                        numStudyBuddies: numStudyBuddies,
                    }, {
                        where: {
                            email: userEmail,
                        },
                    });
                    console.log("After add: ", user.studyBuddyList);
                    console.log(currentStudyBuddyList);
                    res.json(user.studyBuddyList);
                    console.log("Add study buddy successful!");
                }
            } catch (err) {
                res.status(500).json("Error creating/updating study buddy list! :(");
            }
        }
    } else {
        res.status(400).json("User or study buddy does not exist!");
    }
});

//Create/update study buddy list
router.post("/removeStudyBuddy", async(req, res) => {
    const { userEmail, studyBuddyEmail } = req.body; //get body of data being pass in
    //Check if user and study buddy exist
    //Note: maybe it is unnecessary to check if study buddy exists?
    const user = await Users.findOne({
        where: {
            email: userEmail,
        },
    });
    const studyBuddy = await Users.findOne({
        where: {
            email: studyBuddyEmail,
        },
    });
    if (user && studyBuddy) {
        if (userEmail === studyBuddyEmail) {
            res.status(400).json("You cannot remove yourself from your study buddy list!");
        } else {
            try {
                //Check if user has a study buddy list
                console.log("Before removal: ", user.studyBuddyList);
                const currentStudyBuddyList = user.studyBuddyList;
                if (currentStudyBuddyList) {
                    //Check if study buddy exists in study buddy list
                    const index = currentStudyBuddyList.indexOf(studyBuddyEmail);
                    if (index > -1) {
                        currentStudyBuddyList.splice(index, 1);
                        const numStudyBuddies = currentStudyBuddyList.length;
                        //Update study buddy list
                        await Users.update({
                            studyBuddyList: currentStudyBuddyList,
                            numStudyBuddies: numStudyBuddies,
                        }, {
                            where: {
                                email: userEmail,
                            },
                        });
                        console.log("After removal: ", user.studyBuddyList);
                        console.log("Current Study Buddy List: ", currentStudyBuddyList);
                        res.json(user.studyBuddyList);
                        console.log("Remove study buddy successful!");
                    } else {
                        throw "Study buddy not in the list!";
                    }
                } else {
                    throw "No bitches? :(";
                    //throw "User has no study buddy list!";
                }
            } catch (err) {
                res.status(400).json(err);
            }
        }
    } else {
        res.status(400).json("User or study buddy does not exist!");
    }
});

//middleware for server.js
module.exports = router;