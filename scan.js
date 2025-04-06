const express = require('express');
const Scan = require('../models/Scan');
const QRCode = require('../models/QRCode');
const Store = require('../models/Store');
const User = require('../models/User');
const SalesAssociate = require('../models/SalesAssociate');
const { calculateDistance } = require('../utils/geolocation');
const router = express.Router();

router.post('/', async (req, res) => {
  const { qrCode, latitude, longitude, associateId, userId } = req.body;

  try {
    const qrCodeRecord = await QRCode.findOne({ code: qrCode });
    if (!qrCodeRecord) {
      return res.status(404).json({ message: 'Invalid QR code' });
    }

    const scanRecord = await Scan.findOne({ qrCode: qrCode });
    if (scanRecord && (scanRecord.associateId || scanRecord.pointsAwarded > 0)) {
      return res.json({
        message: 'This product has already been registered with the Loyalty & Rewards program',
        redirectUrl: '/home'
      });
    }

    const store = await Store.findOne({
      location: { $near: { $geometry: { type: 'Point', coordinates: [longitude, latitude] }, $maxDistance: 100 } }
    });

    if (!store) {
      return res.status(400).json({ message: 'Unable to validate scan location' });
    }

    if (!scanRecord) {
      const newScan = new Scan({
        qrCode,
        storeId: store._id,
        associateId: associateId || null,
        userId,
        latitude,
        longitude,
        scanTime: new Date(),
        pointsAwarded: qrCodeRecord.points || 0
      });

      await newScan.save();

      const user = await User.findById(userId);
      user.points += newScan.pointsAwarded;
      await user.save();

      return res.json({
        message: 'Scan successful, points awarded',
        pointsAwarded: newScan.pointsAwarded,
        userPoints: user.points,
        associateId
      });
    }

    return res.status(400).json({ message: 'Failed to process scan' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;