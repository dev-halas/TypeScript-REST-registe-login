import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken';

dotenv.config();

// CONFIG ENUMS
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@db0.owizfzl.mongodb.net/?retryWrites=true&w=majority`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;
const JWT_SECRET: Secret = process.env.JWT_SECRET || ''

const EMAIL_HOST = process.env.EMAIL_HOST || '';
const EMAIL_PORT = process.env.EMAIL_PORT || '';
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const EMAIL_FROM = process.env.EMAIL_FROM || '';


export const config = {
    mongo_db: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        secret: JWT_SECRET
    },
    email: {
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        user: EMAIL_USER,
        pass: EMAIL_PASS,
        from: EMAIL_FROM
    }
}