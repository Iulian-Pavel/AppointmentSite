const mongoose = require("mongoose");
const UserModel = require("./UserModel").schema;
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false
  },

  Date: {
    type: Date,
    unique: true,
  },
  Time: {
    type: String,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = appointment;