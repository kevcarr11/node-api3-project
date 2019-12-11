const express = require('express');

const router = express.Router();

const user = require('../users/userDb')

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
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

router.put('/:id', validateUserId(), (req, res) => {
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

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
