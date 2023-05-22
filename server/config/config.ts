import dotenv from 'dotenv'

dotenv.config();

// CONFIG ENUMS
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@db0.owizfzl.mongodb.net/?retryWrites=true&w=majority`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;

export const config = {
    mongo_db: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}