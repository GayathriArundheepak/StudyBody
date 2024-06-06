import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
const cookieParser = require('cookie-parser');
import path from "path";
dotenv.config()
const createServer=()=>{
const app=express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
     // Use cookie-parser middleware
      app.use(cookieParser());
      
     // Enable CORS middleware
app.use(cors({
    
     origin: 'https://studdybuddy-learning.netlify.app', // Allow requests from this origin
     
    credentials: true // Allow credentials (cookies)
  })
  );
    return app
}
export default createServer;