require('dotenv').config();

const http = require('http');
const express = require('express');

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const indexRoutes = require('./routes/home.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongoose
mongoose
  .connect(`mongodb://localhost/MyRecipes`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo. Database name: ${x.connections[0].name}`)
  )
  .catch(err => console.error('Error connecting to Mongo.', err));

// express-session
app.use(
  session({
    secret: 'our-passport-local-strategy-app',
    resave: true,
    saveUninitialized: true
  })
);

// passport methods (strategy, serialize and deserialize)
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: 'Incorrect username' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {message: 'Incorrect password'})
      }

      return next(null, user);
    });
  })
);

// passport & passport session
app.use(passport.initialize());
app.use(passport.session());

// Routes use
app.use('/', indexRoutes); // localhost:3000
app.use('/auth', authRoutes); // localhost:3000/auth

server.listen(PORT, err => {
  console.log(`Conected to port: ${PORT}`);
});
