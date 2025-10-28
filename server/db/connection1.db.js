import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        if (!MONGODB_URL) {
            console.warn('MONGODB_URL is not set. Skipping DB connection (set MONGODB_URL in .env)');
            return;
        }
        const instance = await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB Connected: ${instance.connection.host}`);
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message || err);
        // rethrow so callers (e.g. nodemon) see the crash and can report it
        throw err;
    }
};