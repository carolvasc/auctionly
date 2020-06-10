const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')

const AuthController = require("./controllers/AuthController");
const AuctionController = require("./controllers/AuctionController");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/auth", AuthController);
app.use("/api", AuctionController);

app.listen(3000, function () {
  console.log(`API is running on port 3000.`);
})