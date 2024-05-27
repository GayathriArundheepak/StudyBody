import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
const cookieParser = require('cookie-parser');
import path from "path";
dotenv.config()
console.log('no error1')
const createServer=()=>{
  console.log('no error2')
const app=express();
console.log('no error3')
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