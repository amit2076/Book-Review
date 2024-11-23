import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables from .env file
import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('MongoDB connected!');
    } catch (error) {
        console.log('Error in connecting MongoDb:', error.message);
    }
};

export default connectToMongoDB;
