const mongoose = require('../database');

const AuctionSchema = new mongoose.Schema({
  name: { type: String, min: 3, required: true },
  initialValue: { type: Number, min: 1, required: true },
  usedItem: { type: Boolean, required: true },
  createAt: { type: Date, default: Date.now },
  openingDate: { type: String, required: true },
  endDate: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Auction = mongoose.model('Auction', AuctionSchema);

module.exports = Auction;