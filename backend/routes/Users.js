const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bycrypt = require("bcrypt");

router.post("/", async(req, res) => {
    const { email, password } = req.body;
    // bycrypt.hash(password, 10, async(hash) => {
    //     try {
    //         const user = await Users.create({
    //             email: email,
    //             password: hash
    //         });
    //         res.json(user);
    //     } catch (err) {
    //         res.status(500).send(err);
    //     }
    // });



    bycrypt.hash(password, 10).then(async(hash) => {
        try {
            const user = await Users.create({
                email: email,
                password: hash,
            });
            res.json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    });
});

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



// router.get("/", async(req, res) => {
//     const listOfUsers = await Users.findAll();
//     res.json(listOfUsers);
// });

// router.post("/", async(req, res) => {
//     const user = req.body; //get body of data being pass in
//     // try {
//     await Users.create(user); //Sequelize table puts data into table
//     // } catch (error) {
//     //     console.log(":(");
//     // }
//     res.json(user); //return json
// });

//middleware for server.js
module.exports = router;