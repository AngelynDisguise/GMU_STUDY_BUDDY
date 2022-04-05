const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bycrypt = require("bcrypt");

router.post("/", async(req, res) => {
    const { email, password } = req.body;
    bycrypt.hash(password, 10).then((hash) => {
        Users.create({
            email: email,
            password: hash,
        });
        res.json("User created");
    });
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