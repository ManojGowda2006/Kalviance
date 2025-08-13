require('dotenv').config();
const express = require('express');
const connectDB = require('./database/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/route');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());
app.use('/api', router);

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});