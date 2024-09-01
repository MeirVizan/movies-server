import mongoose from 'mongoose';

const connectDB = async () => {
    console.log('connectDB')
    try {
        await mongoose.connect('mongodb+srv://meir15102:M8hFkPE2VF6DfmqV@cluster0.oyybk.mongodb.net/Movies?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected...');
    } catch (err : any) {
        console.log('err', err);
        
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
