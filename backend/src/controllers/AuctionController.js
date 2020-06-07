const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const User = require('../models/User');
const Auction = require('../models/Auction');

router.use(authMiddleware);

router.get('/auction/all', async (req, res) => {
  try {
    let auctions = await Auction.find();

    return res.send({ auctions });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Get all failed' });
  }
});

router.get('/auction', async (req, res) => {
  try {
    const auction = await Auction.findById(auction_id);

    if (!auction) {
      return res.status(400).send({ error: 'Auction not found' });
    }

    return res.send({ auction });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Get on failed' });
  }
});

router.post('/auction', async (req, res) => {
  const { user } = req.body;
  try {
    if (!await User.findById(user.id))
      return res.status(400).send({ error: 'User not found' });

    const auction = await Auction.create(req.body);

    return res.send({ auction });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.put('/auction', async (req, res) => {
  res.send({ ok: true });
});

router.delete('/auction', (req, res) => {
  res.send({ ok: true });
});

module.exports = app => app.use('/api', router);