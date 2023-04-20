import mongoose from 'mongoose';

const connectDB = (url) => {
    // it will use in search functionality
    mongoose.set('strictQuery', true);

    //connecting the mongoDb
    mongoose.connect(url)
        .then(()=> console.log('MongoDB connected'))
        .catch((err)=> console.log(err));
}

export default connectDB;