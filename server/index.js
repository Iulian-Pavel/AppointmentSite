const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');
const app = express();
const bcrypt = require('bcrypt');
require('dotenv').config();
const port = 3001;

app.use(cors());
app.use(express.json());

let CONNECTION_LINK = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.hafyinl.mongodb.net/`

mongoose.connect(CONNECTION_LINK, {
    usenewUrlParser: true
})


app.get('/', (req, res) => {
    res.send("User logged in succesfully");
});

app.post('/insert', async (req, res) => {
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({Username: username, Email: email, Password: hashedPassword});

    try {
        await user.save();
        console.log("User inserted succesfully");
    }   
    catch(err) {
        console.error(`An error occured! ${err}`);
        res.status(500).send("An error occured!" + err);
    }
})

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})