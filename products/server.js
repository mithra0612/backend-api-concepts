const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
app.use(express.json());
app.use('/api',productRoutes);
app.listen(3000,() => console.log("App is running."));