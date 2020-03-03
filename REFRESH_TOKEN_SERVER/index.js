const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const config = require('./config');

app.all('/refresh', (req, res, next) => {
  let access_token = req.headers['x-access-token'];//Not in use
  let refresh_token = req.headers['x-refresh-token'];
  
  if (access_token && refresh_token) {
    jwt.verify(refresh_token, config.refresh_token_secret, function(err) {
      if (err) {
        return res.status(403)
          .json({ success: false, message: 'Failed to authenticate token.' });
      }

      const data = jwt.decode(refresh_token).firstName;
      const user = {
        firstName: data
      }

      const refreshed_access_token = jwt.sign(user, config.access_token_secret, { expiresIn: config.access_token_life});
      res.status(200).send({ success: true, refreshed_access_token });
    });
    
  } else {
    res.status(401).send({ success: false, message: 'No token provided.' }).end();
  }
});

app.listen(config.port, () => {
  console.log(`Server running at: http://localhost:${config.port}/`);
});