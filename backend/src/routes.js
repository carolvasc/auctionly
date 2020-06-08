const express = require('express');
const AuthController = require('./controllers/AuthController');
const AuctionController = require('./controllers/AuctionController');

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/authenticate', AuthController.authenticate);

routes.get('/auction/:id', AuctionController.getById);
routes.get('/auction/all', AuctionController.getAll);
routes.post('/auction', AuctionController.save);
routes.put('/auction/:id', AuctionController.update);
routes.delete('/auction/:id', AuctionController.delete);

module.exports = routes;