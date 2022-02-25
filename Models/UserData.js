const mongoose = require('mongoose');

const UserData = mongoose.Schema({
  UserID: String,
  Name: String,
  Process: String,
  Role: String
})

module.exports = mongoose.model("UserData", UserData)