import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionStatus = await mongoose.connect(process.env.MONGODB_URI);
        if (connectionStatus?.connection?.host) {
            console.log(`Sucessfully Connected to DB at :${connectionStatus?.connection?.host}`);
        } else {
            console.log(`Error While connecting to the DB: ${connectionStatus?.connection}`);
        }
    } catch (error) {
        console.error('Error Connecting To DB:', error.message);
        process.exit(1);
    }
}