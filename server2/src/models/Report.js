import mongoose, { Schema, model } from "mongoose";

const ReportSchema = new Schema(
  {
    reportLink: {
      type: String,
      default: null,
    },
    userName: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Report = model("report", ReportSchema);
export default Report;
