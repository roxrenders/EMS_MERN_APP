import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true,'First name is required'],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true,'Last name is required'],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true,'Email name is required'],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true,'Password name is required'],
      min: 5,
    },
    location: {
      type: String,
      required: [true,'Location name is required'],
      max: 30,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: [true,'Location name is required'],
      max: 30,
      unique: true,
    },
    role:{
        type:Number,
        default:0
    },

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

