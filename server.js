const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsageData = require('./models/UsageData');
require('dotenv').config();


const app = express();
const port = 3000;

// MongoDB Atlas URI
const mongoURI = process.env.MONGO_URI; 

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MongoDB Connection
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// GET route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST route to receive and store data
app.post('/upload', async (req, res) => {
  try {
    const { time, cpu, memory, disk } = req.body;
    const newEntry = new UsageData({ time, cpu, memory, disk });
    await newEntry.save();
    res.status(201).json({ message: '✅ Data saved successfully' });
  } catch (err) {
    console.error('❌ Error saving data:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/upload', async (req, res) => {
  try {
    const entries = await UsageData.find().sort({ createdAt: -1 });
    res.status(200).json(entries); // MUST be .json()
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});



// npm  i  init  
// npm i express
// npm install express 
// npm install mongodb
// npm i mongoose 
// npm i cors
// npm i dotenv



// 🔹 cors (Cross-Origin Resource Sharing)
// Allows your server to accept requests from different origins (e.g., your frontend on localhost:5173 calling backend on localhost:3000).

// Prevents CORS errors in the browser.

// 🔹 dotenv
// Loads environment variables (like MongoDB URI) from a .env file into process.env.

// Keeps sensitive info (like passwords) out of your codebase.


// 🔹 app.use(express.json());
// Middleware to automatically parse incoming JSON data in req.body.

// Needed for POST requests where body data is sent as JSON. 



// Check  data  in  MongoDB Atlas
// 1. Go to your MongoDB Atlas dashboard.
// 2. Select your cluster.
// 3. Click on "Browse Collections" to view your databases and collections.
