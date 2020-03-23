const express = require('express');

const router = express.Router();

// localhost:3000/auth/signup ⬇
router.get('/signup', (req, res, next) => {
  res.status(200).json('SIGNUP route is working');
});

// localhost:3000/auth/login ⬇
router.get('/login', (req, res, next) => {
  res.status(200).json('LOGIN route is working.');
});

module.exports = router;
