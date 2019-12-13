const express = require('express');
const posts = require('../posts/postDb')

const router = express.Router({
  mergeParams: true,
});

router.get('/', (req, res) => {
  posts.get()
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/:id', validatePostId(), (req, res) => {
    res.json(req.post)
});

router.delete('/:id', validatePostId(), (req, res) => {
  posts.remove(req.post.id)
    .then(() => {
      res.json({ message: "Post was successfully deleted" })
    })
    .catch(err => {
      next(err)
    })
});

router.put('/:id', validatePostId(), (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing post data" })
  } if (!req.body.text) {
    return res.status(400).json({ message: "missing required text field" })
  }

  posts.update(req.post.id, req.body)
    .then(count => {
      if (count === 1) {
        return posts.getById(req.post.id)
      } else {
        res.status(500).json({ error: "The post information could not be modified." })
      }
    })
      .then(post => {
        res.status(201).json(post)
      })
    .catch(err => {
      next(err)
    })
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    posts.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post
        next()
      } else {
        res.status(400).json({ message: "invalid posts id" })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the posts"
      })
    })
  }
}

module.exports = router;
