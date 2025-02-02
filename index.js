require('dotenv').config();
const express = require('express');

const connectDB = require('./config/databse');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


connectDB();


app.use(express.json());
app.use(cors());



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});