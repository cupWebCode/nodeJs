const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const config = require('./config');

app.all('/token', (req, res, next) => {
  let refresh_token = req.headers['x-refresh-token'];

  if (refresh_token) {//Should I check if refresh_token equal refresh_token from DB?
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