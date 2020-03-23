const User = require('../models/user.model');
const mongoose = require('mongoose');

const users = [
  new User({
    username: 'test',
    password: 'test',
    email: 'ironhacker0102@gmail.com'
  }),
  new User({
    username: 'test2',
    password: 'test2',
    email: 'ironhacker0102@gmail.com'
  })
];

mongoose
  .connect(`mongodb://localhost/MyRecipes`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => User.collection.drop())
  .catch(err => console.log(`error deleting data: ${err}`))
  .then(() => User.insertMany(users))
  .catch(err => console.log(`error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
