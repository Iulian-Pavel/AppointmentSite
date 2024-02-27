const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();

app.use(cors());
app.use(express.json());

let CONNECTION_LINK = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.hafyinl.mongodb.net/`;

mongoose.connect(CONNECTION_LINK, {
  usenewUrlParser: true,
});

app.get("/", (req, res) => {
  res.send("User logged in succesfully");
});

app.post("/insert", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    Username: username,
    Email: email,
    Password: hashedPassword,
  });

  try {
    await user.save();
    console.log("User inserted succesfully");
  } catch (err) {
    console.error(`An error occured! ${err}`);
    res.status(500).send("An error occured!" + err);
  }
});

app.post("/login", async (req, res) => {
  const userLogin = req.body.userLogin;
  const passwordLogin = req.body.passwordLogin;

  try {
    const user = await UserModel.findOne({ Username: userLogin });

    if (!user) {
      console.log("user not found");
    }

    const isPasswordValid = await bcrypt.compare(passwordLogin, user.Password);
    if (!isPasswordValid) {
      console.log("password is not valid");
      res.status(500).send("password is not valid");
      return;
    } else {
      console.log("password is valid");
      console.log("login sucessful");
    }
  } catch (err) {
    console.log(`Login error! ${err}`);
  }
});

app.listen(3001, () => {
  console.log(`Running on port 3001`);
});
