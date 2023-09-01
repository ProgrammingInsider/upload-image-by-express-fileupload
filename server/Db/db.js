import mongoose from 'mongoose'

const connectionString = "mongodb+srv://myname:pass123@cluster0.zr4z4es.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(connectionString);

var conn = mongoose.connection;

conn.on('connected',function(){
    console.log('database is connected successfully');
});

conn.on('disconnected',function(){
    console.log('database is disconnected');
})

conn.on('error',console.error.bind(console,'connection error:'))

export default conn;