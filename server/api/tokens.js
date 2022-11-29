const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/sign', async (req, res) => {
  console.log(req.body)
  const { clientId, roomId } = req.body;
  let authToken = jwt.sign({
    cliendId: clientId,
    roomId: roomId
  }, process.env.JWT, {expiresIn: '1h'});
  
  res.json(authToken);
  
});

router.post('/verify/:token', async (req, res) => { 
  // verify token
  jwt.verify(req.params.token, process.env.JWT, (err, decoded) => {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json(decoded);
    }
  });
});


module.exports = router;