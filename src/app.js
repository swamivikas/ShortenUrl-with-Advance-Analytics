// src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes'); // Adjust path as necessary

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://vikas:vikas@cluster0.ohc7c0g.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
