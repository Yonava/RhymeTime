const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/sign', async (req, res) => {
  const { clientId, roomId } = req.body;
  let authToken = jwt.sign({
    clientId,
    roomId
  }, process.env.JWT, {
    expiresIn: '30m'
  });
  
  res.json(authToken);
});

router.get('/verify/:token', async (req, res) => { 
  // verify token
  jwt.verify(req.params.token, process.env.JWT, (error, decoded) => {
    if (error) {
      res.json({
        error
      });
    } else {
      res.json({ 
        roomId: decoded.roomId, 
        clientId: decoded.clientId
      });
    }
  });
});


module.exports = router;