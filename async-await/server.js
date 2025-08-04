const express = require('express');
const mongoose = require('mongoose');
const NotificationRoutes = require('./Routes/NotificationsRoute');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/BackendDB')
.then(() => console.log("MongoDB connected successfully"))
.catch((err) =>{
    console.log("Error in connecting with mongodb.");
    console.error(err);
});

app.use('/api',NotificationRoutes);
app.listen(3000,() => console.log("https://localhost:3000/"));
