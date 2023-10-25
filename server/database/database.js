import mongoose from 'mongoose';


const Connection = () => {


    mongoose.connect('mongodb://localhost:27017/userlogin', { useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
        console.log('Database Connected Successfully!!');
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Database Disconnected');
    })

    mongoose.connection.on('error', () => {
        console.log('Error while connecting to the Database ', error.message);
    })
}

export default Connection;
