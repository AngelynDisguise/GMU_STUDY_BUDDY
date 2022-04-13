const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

require('dotenv').config({ override: true });
// console.log("INSIDE SERVER.JS");
// console.log(process.env);

const db = require("./models");

//Routers
app.use("/health", (req, res) => {
    res.json("Health Check Success!");
});

const userRouter = require('./routes/Users');
app.use("/users", userRouter);

//Initialize the server
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port 3001");
    });
});