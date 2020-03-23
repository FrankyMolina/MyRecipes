const express = require('express');

const router = express.Router();

// localhost:3000/ping
router.get('/', (req,res,next) => {
  res.status(200).json('HOME page is working!');
})

module.exports = router;