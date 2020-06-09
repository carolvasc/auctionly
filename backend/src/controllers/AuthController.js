const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 }); // 1 dia
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'Usuário já existe.' });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ message: 'Usuário logado com sucesso.', data: { user, token: generateToken({ id: user.id }) } });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao cadastrar o usuário.' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { login, password } = req.body;

  // Descriptografa a senha que vem em base64
  const buff = new Buffer(password, 'base64');
  const pass = buff.toString('ascii');

  const user = await User.findOne({ login }).select('+password');

  if (!user) {
    return res.status(400).send({ error: 'Usuário não encontrado.' });
  } else if (!user.active) {
    return res.status(400).send({ error: 'Usuário desativado.' });
  }

  if (!await bcrypt.compare(pass, user.password)) {
    return res.status(400).send({ error: 'Senha inválida.' });
  }

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = router;