
const request = require('request')
                .defaults({
                  baseUrl: 'http://localhost:8080/api/test',
                  json: true
                });

module.exports.getTestUser = (req, res) => {
  request({
    url: '/',
    method: 'GET',
    headers: req.headers
  }, (err, response, body) => {
    res.render('index', {
      firstName: body.firstname,
      lastName: body.lastname,
      birthdate: body.birthdate,
      locale: body.locale,
      favColor: body.favcolor,
      favSong: body.favsong,
      favAnimal: body.favanimal,
      firstNameErr: null,
      lastNameErr: null
    });
  });
};

module.exports.editTestUser = (req, res) => {
  console.log('ctrlTest body:', req.body);
  request({
    url: '/',
    method: 'POST',
    headers: req.headers,
    form: req.body
  }, (err, response, body) => {
    const data = {};
    console.log('body:', body);
    if (err) {
      console.log('ctrlTest: ERROR returned');
      return res.send(err);
    }
    if (response.statusCode === 400) {
      let { test, errors } = body;
      data.errors = errors;
      data.info = test;
    } else {
      data.info = body;
    }
    let renderData = {
      firstName: data.info.firstname,
      lastName: data.info.lastname,
      birthdate: data.info.birthdate,
      locale: data.info.locale,
      favColor: data.info.favcolor,
      favSong: data.info.favsong,
      favAnimal: data.info.favanimal,
      firstNameErr: null,
      lastNameErr: null
    };
    if (data.errors) {
      if (data.errors.firstname) renderData.firstNameErr = data.errors.firstname;
      if (data.errors.lastname) renderData.lastNameErr = data.errors.lastname;
    }
    res.render('index', renderData);
  });
};
/*
const express = require('express');
const isEmpty = require('lodash/isEmpty');

const router = express.Router();

// Validator
const validateTestData = require('../../validators/test');

// Models
const Test = require('../../models/Test');

// GET api/test
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
        res.json(test);
      })
      .catch(err => res.status(500).json(err));
  }
);

// POST api/test
// Edit test account
router.post('/',
  (req, res) => {
    console.log('api body:', req.body);
    const { errors, isValid } = validateTestData(req.body);
    console.log('errors:', errors);
    console.log('Is valid?', isValid);
    // Return errors if validator returns false
    if (!isValid) {
      Test.findById("5bc65b9ee7179a4377fc8bfe")
        .then(test => {
          return res.status(400).json({test, errors});
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
      // Kludge, because request is messing up the data
      if (req.body.favanima) {
        setData.favanimal = req.body.favanima;
      }
      
      const update = { $set: setData };
      console.log('update:', update);
      if (!isEmpty(unsetData)) {
        update.$unset = unsetData;
      }
      
      Test.findByIdAndUpdate("5bc65b9ee7179a4377fc8bfe", update, { new: true })
        .then(test => {
          console.log('Responding:', test);
          res.json(test);
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
*/