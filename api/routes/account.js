const express = require('express');
const isEmpty = require('lodash/isEmpty');
const passport = require('passport');

const router = express.Router();

// Validator
const validateAccountData = require('../../validators/account');

// Models
const Account = require('../../models/Account');
//const User = require('../../models/User');

// GET api/account
// Get user account
// Authentication required
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Account.findOne({ user: req.user.id })
      .populate('user', ['avatar'])
      .populate('characters')
      .then(account => {
        if (!account) {
          errors.account = 'User does not have an account.';
          return res.status(400).json(errors);
        }
        res.json(account);
      }) 
      .catch(err => res.status(500).json(err));
  }
);

// POST api/account
// Create new user account
// Authentication required
router.post('/', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAccountData(req.body);

    // Return errors if validator returns false
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    
    Account.findOne({ user: req.user.id })
      .then(account => {
        if (account) {
          // User already has an account.
          errors.account = 'User has already created an account.';
          return res.status(400).json(errors);
        } else {
          // Create a new account
          let indexName = req.body.username.toLowerCase();
          Account.findOne({ indexname: indexName })
            .then(account => {
              if (account) {
                errors.handle = 'That username is already in use.';
                return res.status(400).json(errors);
              }
              // Save account
              const accountData = {
                user: req.user.id,
                username: req.body.username,
                birthdate: req.body.birthdate,
                indexname: indexName
              };
              if (req.body.locale) {
                accountData.locale = req.body.locale;
              }
              new Account(accountData).save()
                .then(account => res.json(account))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
);

// POST api/account/edit
// Edit an existing account
// Authentication required
router.post('/edit', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAccountData(req.body, true);
    
    // Return errors if validator returns false
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    
    const setData = {};
    const unsetData = {};
    
    if (req.body.birthdate) {
      setData.birthdate = req.body.birthdate;
    }
    if (req.body.locale) {
      setData.locale = req.body.locale;
    } else if (req.body.locale === undefined) {
      // Set field to be removed from DB.
      unsetData.locale = '';
    }
    
    let update = { $set: setData };
    if (!isEmpty(unsetData)) {
      update.$unset = unsetData;
    }
    Account.findOneAndUpdate({ user: req.user.id }, update, { new: true })
      .then(account => res.json(account))
      .catch(err => {
        if (err) console.log(err);
        errors.notfound = 'There is no account for this user.';
        return res.status(400).json(errors);
      });
  }
);

module.exports = router;
