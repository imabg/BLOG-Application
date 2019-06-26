const jwt = require('jsonwebtoken');
const User = require('../api/model/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    let decoded = await jwt.verify(token, 'BlogApp');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });
    if (!user) throw new Error('No User Found.');
    req.token = token;
    req.user = user;
  } catch (e) {
    res.status(404).send({ error: 'Please Authenticate.' });
  }
  next();
};

module.exports = auth;
