// import mongoose from "mongoose";
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

const Admin = new mongoose.model("Admin", adminSchema);
module.exports = Admin;
