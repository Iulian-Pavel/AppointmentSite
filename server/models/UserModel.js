const mongoose = require('mongoose');

let errorInfo;
let pattern;

let validateEmail = (email) => {
    pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return pattern.test(email);
}

let validatePassword = (password) => {
    pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");
    errorInfo = "Password should contain at least 8 characters, one special character and one uppercase letter"
    return pattern.test(password);
}

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: "Username cannot be empty",
        trim: true,
        unique: "That username is already taken"

    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validateEmail, "Please enter a valid email address"],
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        validate: [validatePassword, errorInfo]
    }
});

const user = mongoose.model("User", UserSchema);
module.exports = user;