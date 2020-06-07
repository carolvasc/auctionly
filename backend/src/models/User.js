const mongoose = require('../database');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true},
  login: { type: String, required: true },
  password: { type: String, min: 6, required: true, select: false },
  active: { type: Boolean },
  createAt: { type: Date, default: Date.now }
})

// Antes de salvar o usuário
UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;