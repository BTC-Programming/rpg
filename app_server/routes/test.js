const express = require('express');
const isEmpty = require('lodash/isEmpty');
const moment = require('moment');

const router = express.Router();

// Validator
const validateTestData = require('../../validators/test');

// Models
const Test = require('../../models/Test');

function _setRenderLocals(data, errors) {
  const locals = {
    firstName: data.firstname,
    lastName: data.lastname,
    birthdate: data.birthdate,
    locale: data.locale,
    favColor: data.favcolor,
    favSong: data.favsong,
    favAnimal: data.favanimal
  };
  locals.birthdate = locals.birthdate ? moment(locals.birthdate).format('MMMM Do, YYYY') : null;
  locals.firstNameErr = (errors && errors.firstname) ? errors.firstname : null;
  locals.lastNameErr = (errors && errors.lastname) ? errors.lastname : null;
  return locals;
}

// GET test
// Get test account
router.get('/',
  (req, res) => {
    const errors = {};
    
    Test.findById("5bc65b9ee7179a4377fc8bfe")
      .then(test => {
        if (!test) {
          errors.test = 'Something went horribly wrong!';
          return res.status(500).json(errors);
        }
        res.render('index', _setRenderLocals(test));
      })
      .catch(err => res.status(500).json(err));
  }
);

// POST api/test
// Edit test account
router.post('/',
  (req, res) => {
    const { errors, isValid } = validateTestData(req.body);

    // Return errors if validator returns false
    if (!isValid) {
      Test.findById("5bc65b9ee7179a4377fc8bfe")
        .then(test => {
          res.render('index', _setRenderLocals(test, errors));
        })
        .catch(err => {
        if (err) console.log(err);
        errors.ack = 'Something went horribly wrong!';
        return res.status(500).json(errors);
      });
    } else {
      const setData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
      };
      const unsetData = {};
      
      if (req.body.birthdate) {
        setData.birthdate = req.body.birthdate;
      } else {
        unsetData.birthdate = '';
      }
      if (req.body.locale) {
        setData.locale = req.body.locale;
      } else {
        unsetData.locale = '';
      }
      if (req.body.favcolor) {
        setData.favcolor = req.body.favcolor;
      } else {
        unsetData.favcolor = '';
      }
      if (req.body.favsong) {
        setData.favsong = req.body.favsong;
      } else {
        unsetData.favsong = '';
      }
      if (req.body.favanimal) {
        setData.favanimal = req.body.favanimal;
      } else {
        unsetData.favanimal = '';
      }
      
      const update = { $set: setData };
      if (!isEmpty(unsetData)) {
        update.$unset = unsetData;
      }
      
      Test.findByIdAndUpdate("5bc65b9ee7179a4377fc8bfe", update, { new: true })
        .then(test => {
          res.render('index', _setRenderLocals(test));
        })
        .catch(err => {
          if (err) console.log(err);
          errors.ack = 'Something went horribly wrong!';
          return res.status(500).json(errors);
        });
    }
  }
);

module.exports = router;
