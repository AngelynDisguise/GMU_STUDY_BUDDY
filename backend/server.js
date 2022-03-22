const express = require('express');
const app = express();
// const cors = require('cors');
const db = require("./models");

//app.use(cors())
db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('API is running on http://localhost:3000/login')
    });
});
