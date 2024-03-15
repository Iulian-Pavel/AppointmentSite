const express = require("express");
// const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");
const AppointmentModel = require("./models/AppointmentModel");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// app.use(session({
//   secret: process.env.SECRET_KEY,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000
//   }
// }));

let CONNECTION_LINK = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.hafyinl.mongodb.net/`;

mongoose.connect(CONNECTION_LINK, {
  usenewUrlParser: true,
});

// app.get("/", (req, res) => {
//   res.send("User logged in succesfully");
// });

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
      return;
    }

    const isPasswordValid = await bcrypt.compare(passwordLogin, user.Password);
    if (!isPasswordValid) {
      console.log("password is not valid");
      res.status(500).send("password is not valid");
      return;
    } 

    console.log("password is valid, login succesful");
    console.log(userLogin, passwordLogin);
    res.status(200).json({username: user.Username});

    // req.session.userID = user._id;
    // res.redirect(`home/${user.Username}`)
  } catch (err) {
    console.log(`Login error! ${err}`);
  }
});

// app.get('/home', (req, res) => {

//   if(!req.session.userID) {
//     res.redirect("/login");
//   }
// });

app.post("/createAppointment", async (req, res) => {

  const username = req.body.username;
  const date = req.body.date.toString().split("T")[0];
  const time = req.body.time;
  const title = req.body.appointmentTitle;

  try {
    const user = await UserModel.findOne({Username: username});
    console.log(username);
    console.log(user);
    const newAppointment = new AppointmentModel({
      title: title,
      Date: date,
      Time: time,
      user: user._id
    });

    await newAppointment.save();
  } catch(err) {
    console.log(`Error creating appointment: ${err}`);
  }
});



app.listen(3001, () => {
  console.log(`Running on port 3001`);
});
