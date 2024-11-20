import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `mongodb connection successfull || HOST ${connect.connection.host}`,
    );
  } catch (error) {
    console.log("Mongodb connection failed", error);
    process.exit(1);
  }
};

export default dbConnect;
