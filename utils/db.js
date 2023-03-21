import mongoose from 'mongoose';

const connection = {};

async function connectDb(){

    if(connection.isConnected){

        console.log('Already connected to db');

        return;

    }

    if(mongoose.connections.length>0){

        connection.isConnected = mongoose.connections[0].readyState;

        if (connection.isConnected === 1) {
            
            console.log("Use Previious connection database");

            return;

        }

        await mongoose.disconnect();

    }

    const db = await mongoose.connect(process.env.MONGODB_URL,{

        useNewUrlParser:true,
        useUnifiedTopology:true,

    });

    console.log("New Connection to the database");

    connection.isConnected = db.connections[0].readyState;

}

async function disconnectDb(){

    if(connection.isConnected){

        if (proccess.env.NODE_END === "production") {
            
            await mongoose.disconnect();

            connection.isConnected = false;

        } else{

            console.log("Not Disconnecting from the database");

        }

    }

}

const db = {connectDb,disconnectDb};

export default db;