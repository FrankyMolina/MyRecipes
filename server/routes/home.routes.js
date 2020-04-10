const express = require('express');


const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/')
}

// localhost:3000/ping
router.get('/', (req, res, next) => {
  res.status(200).json('HOME page is working!');
});

router.get('/logged', (req, res, next) => {
  res.status(200).json('You are logged in =)');
});

router.get('/recipes', ensureAuthenticated, (req, res, next) => {
  res.status(200).json('here will be all the recipes');
});

module.exports = router;
