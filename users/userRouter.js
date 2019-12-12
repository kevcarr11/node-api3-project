const express = require('express');
const user = require('../users/userDb.js')
const postRouter = require("../posts/postRouter")

const router = express.Router()

router.use("/:id/posts", postRouter)


router.post('/', validateUser(), (req, res) => {
  user.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  user.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      next(err)
    })
})


router.get('/', (req, res) => {
  user.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      next(err)
    })
})


router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  user.getUserPosts(req.params.id)
    .then(userPosts => {
      res.status(200).json(userPosts)
    })
    .catch(err => {
      next(err)
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  user.remove(req.user.id)
    .then(() => {
      res.json({ message: "User was successfully deleted" })
    })
    .catch(err => {
      next(err)
    })
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  user.update(req.user.id, req.body)
    .then(count => {
      if (count === 1) {
        return user.getById(req.user.id)
      } else {
        res.status(500).json({ error: "The post information could not be modified." })
      }
    })
      .then(user => {
        res.json(user)
      })
    .catch(err => {
      next(err)
    })
});

// custom middleware

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
      .catch(error => {
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
    } if (!req.body.name) {
      return res.status(400).json({ message: "missing required name field" })
    }
    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing post data" })
    } if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" })
    }
    next()
  }
}

module.exports = router