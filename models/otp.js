import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        default: null,
    },

    phoneNo: {
        type: String,
        trim: true,
        default: null,
    },

    otp: {
        type: String, // Store hashed OTP
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // Automatically delete after 5 minutes
    },
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;

