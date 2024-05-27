import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
const cookieParser = require('cookie-parser');
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const createServer=()=>{
const app=express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
     // Use cookie-parser middleware
      app.use(cookieParser());
     // Enable CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true // Allow credentials (cookies)
  })
  );
    return app
}
export default createServer;