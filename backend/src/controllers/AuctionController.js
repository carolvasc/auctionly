const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const User = require('../models/User');
const Auction = require('../models/Auction');

router.use(authMiddleware);

router.get('/auction/all', async (req, res) => {
  try {
    let auctions = await Auction.find();

    return res.send({ message: 'Dados retornados com sucesso.', data: auctions });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao buscar todos os leilões.' });
  }
});

router.get('/auction/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(400).send({ error: 'Leilão não encontrado.' });
    }

    return res.send({ message: 'Dados retornados com sucesso.', data: auction });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao buscar o leilão.' });
  }
});

router.post('/auction', async (req, res) => {
  const { user } = req.body;

  try {
    if (!await User.findById(user))
      return res.status(400).send({ error: 'Usuário não encontrado.' });

    const auction = await Auction.create(req.body);

    return res.send({ message: 'Leilão adicionado com sucesso.', data: auction });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao cadastrar o leilão.' });
  }
});

router.put('/auction/:id', async (req, res) => {
  try {
    let auction = await Auction.updateOne({ _id: req.params.id }, req.body);

    if (auction.n) {
      auction = await Auction.findById(req.params.id);
    } else {
      return res.send({ message: 'Erro ao alterar os dados do leilão.', data: [] });
    }

    return res.send({ message: 'Leilão alterado com sucesso.', data: auction });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao alterar os dados do leilão.' });
  }
});

router.delete('/auction/:id', async (req, res) => {
  try {
    let auction = await Auction.deleteOne({ _id: req.params.id });

    if (auction.n) {
      return res.send({ message: 'Leilão excluído com sucesso.', data: [] });
    } else {
      return res.send({ message: 'Erro ao alterar os dados do leilão.', data: [] });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao alterar os dados do leilão.' });
  }
});

module.exports = router;