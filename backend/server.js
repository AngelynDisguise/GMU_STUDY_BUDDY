const express = require('express');
const app = express();
// const cors = require('cors');
const db = require("./models");

//Routers
const userRouter = require('./routes/Users');
app.use("/posts, userRouter");

//app.use(cors())
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
});