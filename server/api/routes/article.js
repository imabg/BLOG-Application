const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const auth = require('../../middleware/auth');
const Article = require('../model/article');

const routes = new express.Router();

const upload = multer({
  limits: 1000000,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      cb(new Error('Please upload an image'));
    cb(undefined, true);
  }
});

// POST => Add Article
routes.post('/api/article', auth, async (req, res) => {
  const article = new Article({
    ...req.body,
    author: req.user._id
  });
  try {
    await article.save();
    res.send(article);
  } catch (e) {
    res.status(403).send(e);
  }
});

// GET => Articles through Authentication
routes.get('/api/articles', auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: 'articles',
        sort: {
          createdAt: 1
        }
      })
      .execPopulate();
    res.send(req.user.articles);
  } catch (e) {
    res.status(404).send(e);
  }
});

// GET => All Articles without Authentication
routes.get('/api/articles/all', async (req, res) => {
  try {
    const articles = await Article.find({});
    res.send(articles);
  } catch (e) {
    res.send(e);
  }
});

// GET => Single Article
routes.get('/api/article/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.send(article);
  } catch (e) {
    res.send(e);
  }
});

// PATCH => Articles
routes.patch('/api/article/:id', auth, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body);
    await req.user.save();
    res.send(article);
  } catch (e) {
    res.send(e);
  }
});

// DELETE => Article
routes.delete('/api/article/:id', auth, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.send('Delete Successfully');
  } catch (e) {
    res.send(e);
  }
});

module.exports = routes;
