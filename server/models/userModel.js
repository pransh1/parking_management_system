import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "this field is mandatory"],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "field is mandatory"],
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: [true, "field is mandatory"],
  },
});

export const User = mongoose.model("User", userSchema);
