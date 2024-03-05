import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log('MongoDB connected');
    } catch (error) {
        console.error("Error in connecting MongoDB");
    }
};

export default connect;
