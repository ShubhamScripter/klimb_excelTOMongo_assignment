const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const uploadRoutes = require('./routes/upload');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 5000;
const password="shubham20243";

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/excelToMongo`)
.then(()=>{console.log('database is succesfully connected');})
.catch((err)=>{console.log(`${err} is present`);})

// Middleware
app.use(express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', uploadRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
