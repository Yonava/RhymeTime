const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const server = require('http').Server(app)
exports.server = server

require('./sockets')

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 1010

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

server.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
})