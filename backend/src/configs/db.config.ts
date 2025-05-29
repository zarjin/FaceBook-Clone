import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
