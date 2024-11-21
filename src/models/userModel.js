import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  deleted: {
    type: Boolean,
    default: false,
  }
})

export const User = model("User", userSchema);