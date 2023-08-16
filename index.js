const express = require('express');
const cors = require('./middlewares/cors');
const session = require('./middlewares/session')
const  mongoose  = require('mongoose');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const connectionString = 'mongodb://localhost:27017/car';

start();


async function start() {

    //1 Config Express
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(session()); 


    await mongoose.connect(connectionString);
    console.log("You are connecting to Data Base");
    app.use('/users', authController)
    app.use('/data', dataController)



    //CONFIG PORT  3000
app.listen(3000, ()=> console.log('Port 3000 listening'))
    
}
