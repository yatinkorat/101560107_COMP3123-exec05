const express = require('express');
const routerUser = express.Router();
const user = require('../user.json');

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get('/profile', (req, res) => {
  res.json(user);
});

/*
- Accept username and password as JSON body parameters
- Validate them using user.json
*/
routerUser.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    return res.json({
      status: false,
      message: 'User Name is invalid'
    });
  }

  if (password !== user.password) {
    return res.json({
      status: false,
      message: 'Password is invalid'
    });
  }

  return res.json({
    status: true,
    message: 'User Is valid'
  });
});

/*
- Accept username as a URL parameter
- Return an HTML logout message
*/
routerUser.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logout.</b>`);
});


routerUser.get('/error', (req, res, next) => {
  next(new Error('Test server error'));
});

module.exports = routerUser;
