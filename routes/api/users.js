const bcrypt = require('bcryptjs');
const express = require('express');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../../config/config');
const keys = require('../../config/keys');

const router = express.Router();

// User Model
const User = require('../../models/User');

// Validators
const validateRegisterData = require('../../validators/register');
const validateLoginData = require('../../validators/login');

// POST api/users/register
// Register a new user
router.post('/register',
  (req, res) => {
    const { errors, isValid } = validateRegisterData(req.body);
    
    // Return errors if validator returns false
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          errors.email = 'That email is already in use.';
          return res.status(400).json(errors);
        } else {
          const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mp' });
          const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            avatar: avatar
          });
          
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  const payload = { id: user.id, name: user.name, avatar: user.avatar };
                  
                  jwt.sign(payload, keys.secretOrKey, { expiresIn: config.jwtExpiration },
                    (err, token) => {
                      if (err) {
                        errors.error = 'You could not be logged in.';
                        return res.status(500).json(errors);
                      }
                      res.json({
                        success: true,
                        token: 'Bearer ' + token
                      });
                  });
                })
                .catch(err => console.log(err));
            });
          });
        }
      })
      .catch(err => console.log(err));
});

// POST api/users/login
// Log in existing user
router.post('/login',
  (req, res) => {
    const { errors, isValid } = validateLoginData(req.body);
    
    // Return errors if validator returns false
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    const email =  req.body.email;
    const password = req.body.password;
    
    // Find User by Email
    User.findOne({ email })
      .then(user => {
        // Check for user
        if (!user) {
          errors.email = 'User not found';
          return res.status(404).json(errors);
        }
        
        // Check Password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // User Matched
              // Create JWT Payload
              const payload = { id: user.id, name: user.name, avatar: user.avatar };
              // Sign the Token
              jwt.sign(payload, keys.secretOrKey, { expiresIn: config.jwtExpiration },
                (err, token) => {
                  if (err) {
                    errors.error = 'You could not be logged in.';
                    return res.status(500).json(errors);
                  }
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
              });
            } else {
              errors.password = 'Password incorrect';
              return res.status(400).json(errors);
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
});

// GET api/users/current
// Get current user
// Authentication required
// *** CURRENTLY USED ONLY FOR BACKEND TESTING ***
router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      avatar: req.user.avatar
    });
});

module.exports = router;
