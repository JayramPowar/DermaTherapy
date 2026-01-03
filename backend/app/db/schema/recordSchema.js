// models/Record.js
import mongoose from "mongoose";

export const recordSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    patientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    skinType: {
      type: String,
      enum: ["oily", "dry", "normal", "combination", "sensitive"], 
      required: true,
    },
    familyHistory: {
      type: String,
      trim: true,
    },
    pregnant: {
      type: String,
      enum: ["yes", "no", "not-sure"], 
      default: "not-sure",
    },
    duration: {
      type: String,
      trim: true,
    },
    severity: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    itching: String,
    pain: String,
    discharge: String,
    sunExposure: String,
    stress: String,
    irritants: String,
    treatments: String,
    image: {
      type: String,
      required: true,
    },
    suggestion: String,
    doctor: String,
  },
  {
    timestamps: true,
  }
);

