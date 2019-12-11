const express = require('express');

const router = express.Router();

const user = require('../users/userDb')

router.post('/', validateUser(), (req, res) => {
  user.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ 
        message: "Error occured while creating user"
       })
    })
});

router.post('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  user.insert({ ...req.body })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    user.getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(400).json({ message: "invalid user id" })
        }
      })
      .catch(error =>{
        console.log(error)
        res.status(500).json({
          message: "Error retrieving the user"
        })
      })
  }
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing user data" })
    }
    if (!req.body.name) {
      return res.status(400).json({ message: "missing required name field" })
    }
    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing post data" })
    }
    if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" })
    }
    next()
  }
}

module.exports = router;
