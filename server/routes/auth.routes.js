const express = require('express');

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport')

const router = express.Router();
const bcryptSalt = 10;

// localhost:3000/auth/signup ⬇
router.get('/signup', (req, res, next) => {
  res.status(200).json('SIGNUP route is working');
});

router.post('/signup', (req, res, next) => {
  const { username, password, email } = req.body;

  if (username === '' || password === '') {
    res.status(500).json('Indicate username and password.');
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.status(500).json('The username already exists');
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass,
        email,
      });

      newUser.save(err => {
        if (err) {
          res.json('Something went wrong' );
        } else {
          res.redirect('/');
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

// localhost:3000/auth/login ⬇
router.get('/login', (req, res, next) => {
  res.status(200).json('LOGIN route is working.');
});

router.post('/login', passport.authenticate("local", {
  successRedirect: '/logged',
  failureRedirect: '/auth/login',
  // failureFlash: true,
  passReqToCallback: true
}));


// LOGOUT
router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

module.exports = router;
