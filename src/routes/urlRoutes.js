// src/routes/urlRoutes.js

const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten', urlController.shortenUrl); // POST /api/shorten
router.get('/analytics/:shortCode', urlController.getAnalytics); // GET /api/analytics/:shortCode
router.get('/:shortCode', urlController.redirectUrl); // GET /api/:shortCode

module.exports = router;
