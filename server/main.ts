import createServer from "./config/server";
import connectedDB from "./config/db";
import authRouter from "./routes/auth.route";
import adminRouter from "./routes/admin.route";
import studentRouter from "./routes/student.route";
import teacherRouter from "./routes/teacher.route";
import courseRouter from "./routes/course.route";
import wishlistRouter from "./routes/wishlist.route";
import conversationRouter from "./routes/conversation.route";
import messageRoute from "./routes/message.route";
import cartRouter from "./routes/cart.route";
import dotenv from 'dotenv';
import  express from 'express';
import orderRouter from "./routes/order.route";
dotenv.config()
const app=createServer();
app.use(express.static('public'));
app.use("/api/auth",authRouter)
app.use("/api/student",studentRouter)
app.use("/api/teacher",teacherRouter)
app.use("/api/course",courseRouter)
app.use("/api/wishlist",wishlistRouter)
app.use("/api/cart",cartRouter)
app.use("/api/admin",adminRouter)
app.use('/api/order', orderRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRoute);
const PORT = process.env.PORT ; 
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`),
    connectedDB();
});


