// src/backgroundjobs.js

const Bull = require('bull');
const Url = require('./models/url');

const analyticsQueue = new Bull('analytics', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

analyticsQueue.process(async job => {
  const url = await Url.findById(job.data.urlId);
  if (url) {
    const aggregatedData = {
      totalVisits: url.visits.length,
      uniqueVisitors: new Set(url.visits.map(visit => visit.ipAddress)).size,
      deviceTypes: url.visits.reduce((acc, visit) => {
        acc[visit.deviceType] = (acc[visit.deviceType] || 0) + 1;
        return acc;
      }, {})
    };
    // Save aggregated data somewhere or update the Url document
  }
});

module.exports = analyticsQueue;
