import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try{
        // console.log("DB url ", process.env.MONGO_URL);
        const connect = await mongoose.connect(process.env.MONGO_URL);
        // console.log(`MongoDB Connected Successfully : ${connect.connection.host}`);
        console.log(`MongoDB Connected Successfully`);
    }catch (error){
        console.error(`MongoDB Connected Error: ${error}`);
        // status code 1 [failure] status code 0 [success]
        process.exit(1);
    }
}

