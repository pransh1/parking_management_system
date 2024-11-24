import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "this field is mandatory"],
    unique: true,
    lowercase: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "field is mandatory"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "plrase fill valid email address"],
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^\d{10}$/.test(value),
      message: "phone number must be of 10 digit",
    },
  },
  password: {
    type: String,
    required: [true, "field is mandatory"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: [true, "field is mandatory"],
    default: "user",
  },
});

export const User = mongoose.model("User", userSchema);
