import mongoose from "mongoose";

const DeptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,'Department name is required'],
      min: 1,
      max: 50,
    },
    employees:{
        type: Array,
        default:[],
    },

  },
  { timestamps: true }
);

const Department = mongoose.model("Department", DeptSchema);
export default Department;

