import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Cached connection variable
let cachedConnection: Connection | null = null;

async function dbConnect() {
    if (cachedConnection) {
        console.log('Using cached db connection');
        return cachedConnection;
    }

    try {
        const connection = await mongoose.connect(`${MONGODB_URI}/${MONGODB_DB}`, {
            bufferCommands: false,
        });
        cachedConnection = connection.connection || null;
        console.log('New mongodb connection established');
        return cachedConnection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default dbConnect;
