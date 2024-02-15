const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://sirbuiulianpavel:datapassword@appointment.hafyinl.mongodb.net/`, {
    usenewUrlParser: true
})


app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.post('/insert', async (req, res) => {
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new UserModel({Username: username, Email: email, Password: password});

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