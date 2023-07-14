const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
let passwordSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;
