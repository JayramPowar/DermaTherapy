import mongoose from "mongoose";

// Define a schema for individual history records for better structure
const historyEntrySchema = new mongoose.Schema({
    visitDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    diagnosis: {
        type: String,
        required: true
    },
    prescription: {
        type: String
    }
});


export const patientSchema = new mongoose.Schema({
    // We will use the default '_id' as the unique patient identifier
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        trim: true,
    },
    history: [historyEntrySchema]
}, {
    timestamps: true
});