import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_password: { type: String, required: true },
    user_admin: { type: Boolean, required: true, default: false },
    user_pic: { type: String, default: "https://i.ibb.co/3Fj1g1r/12.jpg" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", productSchema);
export default User;
