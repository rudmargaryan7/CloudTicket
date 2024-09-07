import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  email: String,
  tickets: [],
  liked: [],
});

// Create a model (this will connect to the 'users' collection in the database)
export const User = mongoose.model("User", userSchema);
