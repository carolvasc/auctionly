const express = require('express');
const bodyParser = require('body-parser');

const AuthController = require("./controllers/AuthController");
const AuctionController = require("./controllers/AuctionController");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", AuthController);
app.use("/api", AuctionController);

app.listen(3000);