const express = require('express');
const orderRoutes = require('./orderRoutes');

const app = express();
app.use(express.json());

app.use("/api",orderRoutes);

app.listen(3000,()=>console.log(3000));