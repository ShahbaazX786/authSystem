import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionStatus = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Sucessfully Connected :${connectionStatus?.connection?.host}`);
    } catch (error) {
        console.error('Error Connecting To DB:', error.message);
        process.exit(1);
    }
}