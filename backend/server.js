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
db.sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port", process.env.PORT);
    });
});

/** 
 * Model Sync: https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
 * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 * User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 * User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
 */