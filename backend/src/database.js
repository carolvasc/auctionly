const mongoose = require('mongoose');

const url = 'mongodb://localhost/auctionly';
mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;