// src/models/urls.js

const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
  ipAddress: String,
  deviceType: String,
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expirationDate: { type: Date },
  visits: [visitSchema],
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
