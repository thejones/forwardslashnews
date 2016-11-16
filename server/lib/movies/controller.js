// This would connect to real data.
const db = require('../../db');

// route params are good place to set things on the req object.
exports.params = (req, res, next, id) => {
  db.byId(id)
    .then((post) => {
      if (!post) {
        next(new Error('No post with that id'));
      } else {
        console.log('here');
        req.post = post;
        next();
      }
    }, (err) => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  db.find({ category: 'Movies' })
    .then((posts) => {
      res.render('movies-list', { posts });
    }, (err) => {
      next(err);
    });
};

exports.getOne = (req, res, next) => {
  const post = req.post;
  res.render('movies-item', { post });
};
