const mongoose =  require ( "mongoose");

const User =  mongoose.model(
  "User" , new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }), 'users'
);
module.exports = User