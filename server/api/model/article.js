const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true
    }
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
