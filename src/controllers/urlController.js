const Url = require('../models/url');
const shortid = require('shortid');
const analyticsQueue = require('../backgroundjobs');

const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};

exports.shortenUrl = async (req, res) => {
  const { originalUrl, customCode, expirationDate } = req.body;

  let shortCode = customCode || shortid.generate();

  if (customCode) {
    const existingUrl = await Url.findOne({ shortCode });
    if (existingUrl) {
      return res.status(400).json({ error: 'Custom code already exists' });
    }
  }

  const url = new Url({
    originalUrl,
    shortCode,
    expirationDate
  });

  await url.save();

  res.json({ shortCode });
};

exports.redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (url) {
      if (url.expirationDate && new Date(url.expirationDate) < new Date()) {
        return res.status(410).json({ error: 'URL has expired' });
      }

      trackVisit(req, url);
      return res.redirect(302, url.originalUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error('Error fetching URL:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const trackVisit = async (req, url) => {
  const visit = {
    timestamp: new Date(),
    userAgent: req.headers['user-agent'],
    ipAddress: getClientIp(req),
    deviceType: getDeviceType(req.headers['user-agent'])
  };

  url.visits.push(visit);
  await url.save();

  analyticsQueue.add({ urlId: url._id });
};

const getDeviceType = (userAgent) => {
  if (/mobile/i.test(userAgent)) {
    return 'mobile';
  } else {
    return 'desktop';
  }
};

exports.getAnalytics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    const totalVisits = url.visits.length;
    const uniqueVisitors = new Set(url.visits.map(visit => visit.ipAddress)).size;
    const deviceTypes = url.visits.reduce((acc, visit) => {
      acc[visit.deviceType] = (acc[visit.deviceType] || 0) + 1;
      return acc;
    }, {});

    const timeSeriesData = url.visits.reduce((acc, visit) => {
      const date = new Date(visit.timestamp).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    res.json({
      originalUrl: url.originalUrl,
      totalVisits,
      uniqueVisitors,
      deviceTypes,
      timeSeriesData,
      visits: url.visits
    });
  } catch (err) {
    console.error('Error fetching URL:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
