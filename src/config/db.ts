import mongoose from "mongoose"
const connectDB = async () => {
    try {
        console.log("ENV: ", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI as string);
        // const connection = mongoose.connection;
        // connection.on('connected', () => {
        //     console.log('Mongodb Connected Successfully');
        // })
        console.log('Mongodb Connected Successfully');
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;