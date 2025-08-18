
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/route');
const connectDB = require('./database/database');

// Connect to MongoDB
// connectDB();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', router);
// Middleware to parse cookies
app.use(cookieParser());


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});