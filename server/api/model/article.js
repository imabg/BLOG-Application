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
      type: String,
      default:
        'https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
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
