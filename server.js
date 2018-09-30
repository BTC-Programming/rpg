const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// API Routes
const account = require('./routes/api/account');
const characters = require('./routes/api/characters');
const users = require('./routes/api/users');

const db = require('./config/keys').mongoURI;

const app = express();

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use mongoose to connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Server connected to MongoDB'))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Authentication Strategy
require('./strategies/jwt-strategy')(passport);

// Use routes
app.use('/api/account', account);
app.use('/api/characters', characters);
app.use('/api/users', users);

// Use React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
