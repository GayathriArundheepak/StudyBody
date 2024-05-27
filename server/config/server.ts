import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// Define __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createServer = () => {
    const app = express();
    
    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, '../public')));

    // Use middleware to parse JSON bodies
    app.use(express.json());

    // Use cookie-parser middleware
    app.use(cookieParser());

    // Enable CORS middleware
    app.use(cors({
        origin: 'http://localhost:3000', // Allow requests from this origin
        credentials: true // Allow credentials (cookies)
    }));

    return app;
}

export default createServer;
