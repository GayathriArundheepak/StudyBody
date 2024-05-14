import mongoose  from "mongoose";
const connectedDB =async()=>{
    
    mongoose.connect('mongodb://127.0.0.1:27017/studyBuddy')
    .then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      });
}

export default connectedDB