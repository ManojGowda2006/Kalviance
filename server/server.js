
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/route');
const connectDB = require('./database/database');
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware to parse cookies
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true, 
}));

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', router);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});