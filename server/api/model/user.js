const mongoose = require('mongoose');
require('../../db/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

userSchema.virtual('articles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'author'
});

// Hashing the password
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Adding JWT token
userSchema.methods.jsonwebtoken = async function() {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, 'BlogApp');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// findByCredentials
userSchema.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('No User found');
  let isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Password Not Match.');
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
