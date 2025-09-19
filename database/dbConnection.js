import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://heshamaref3888:Hesham2020@cluster0.slc6oyv.mongodb.net/installment_management_system", {
      // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      // maxPoolSize: 10, // Maintain up to 10 socket connections
      // bufferCommands: false, // Disable mongoose buffering
      // bufferMaxEntries: 0 // Disable mongoose buffering
    })
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
};


//"mongodb+srv://heshamaref3888:Hesham2020@cluster0.slc6oyv.mongodb.net/installment_management_system"
//"mongodb://127.0.0.1:27017/installment_management_system"