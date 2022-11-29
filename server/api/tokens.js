const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/sign', async (req, res) => {
  console.log(req.body)
  const { clientId, roomId } = req.body;
  let authToken = jwt.sign({
    clientId: clientId,
    roomId: roomId
  }, process.env.JWT, {
    expiresIn: '45s'
  });
  
  res.json(authToken);
});

router.post('/verify/:token', async (req, res) => { 
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