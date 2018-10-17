const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// API Routes
const account = require('./api/routes/account');
const characters = require('./api/routes/characters');
const users = require('./api/routes/users');

const db = require('./config/keys').mongoURI;

const app = express();

// Development settings
if (process.env.NODE_ENV === 'development') {
  app.set('views', path.join(__dirname, 'app_server/views'));
  app.set('view engine', 'ejs');
} 

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

// Development routes only
if (process.env.NODE_ENV === 'development') {
  app.use('/api/test', require('./api/routes/test'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/test', require('./app_server/routes/test'));
}

// Use React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
