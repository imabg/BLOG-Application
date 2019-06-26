const express = require('express');

const User = require('../model/user');
const auth = require('../../middleware/auth');

require('../../db/mongoose');

const routes = new express.Router();

// POST => Create new User
routes.post('/api/user', async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.jsonwebtoken();
    await user.save();
    res.send({ user, token });
  } catch (e) {
    res.status(403).send(e.message);
  }
});

// GET => User
routes.get('/api/user', auth, async (req, res) => {
  res.send(req.user);
});

// POST => Login
routes.post('/api/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    let token = await user.jsonwebtoken();
    res.send({ user, token });
  } catch (e) {
    res.status(404).send(e);
  }
});

// DELETE => logout
routes.delete('/api/user/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send('You are Successfully logout.');
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = routes;
