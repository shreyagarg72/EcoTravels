import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firebaseUid: { type: String, required: true, unique: true },  // Ensure this field is unique
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);
export default User;
