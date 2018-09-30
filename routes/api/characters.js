const express = require('express');
const isEmpty = require('lodash/isEmpty');
const passport = require('passport');

const config = require('../../config/config');

const router = express.Router();

// Validator
const validateCharacterData = require('../../validators/character');

// Models
const Account = require('../../models/Account');
const Character = require('../../models/Character');

// GET api/characters
// Get player's characters
// Authentication required
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    
    Account.findOne({ user: req.user.id })
      .then(account => {
        if (!account) {
          errors.noaccount = 'You must have an account to have characters';
          return res.status(400).json(errors);
        }
        Character.find({ _id: { $in: account.characters } })
          .then(characters => {
            if (isEmpty(characters)) {
              errors.nochars = 'You have not yet created a character.';
              return res.status(404).json(errors);
            }
            res.json(characters);
          })
          .catch(err => {
            console.log(err);
            errors.error = 'The server could not complete this action.';
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.error = 'The server could not complete this action.';
        return res.status(500).json(errors);
      });
  }
);

// GET api/characters/:id
// Get character by id
// Authentication required
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    
    Account.findOne({ user: req.user.id })
      .then(account => {
        if (!account) {
          errors.noaccount = 'You must have an account to have a character.';
          return res.status(400).json(errors);
        }
        if (isEmpty(account.characters)) {
          errors.nochars = 'You have not yet created a character.';
          return res.status(400).json(errors);
        }
        
        let found = account.characters.find(character => {
          return character.toString() === req.params.id;
        });
        if (!found) {
          errors.account = 'This character belongs to another account.';
          return res.status(401).json(errors);
        }
        Character.findById(req.params.id)
          .then(character => {
            if (!character) {
              errors.notfound = 'No such character exists.';
              return res.status(404).json(errors);
            }
            res.json(character);
          })
          .catch(err => {
            console.log(err);
            errors.error = 'The server was unable to complete this action.';
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.error = 'The server was unable to complete this action.';
        return res.status(500).json(errors);
      });
  }
);

// POST api/characters
// Create a new character
// Authentication required
router.post('/', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCharacterData(req.body);

    // An account is required to create a character.
    Account.findOne({ user: req.user.id })
      .then(account => {
        if (!account) {
          errors.noaccount = 'You must have an account to create a character.';
          return res.status(400).json(errors);
        }
        
        // Determine if max characters per player is exceeded
        if (!isEmpty(account.characters)) {
          if (account.characters.length >= config.maxCharacters) {
            errors.maxchars = `You may not create more than ${config.maxCharacters} character${config.maxCharacters > 1 ? 's' : ''}`;
            return res.status(400).json(errors);
          }
        }
        if (!isValid) {
          // validateCharacterData() returned false.
          // Return any errors with 400 status.
          return res.status(400).json(errors);
        }
        
        let indexName = req.body.name.toLowerCase();
        Character.findOne({ indexname: indexName })
          .then(character => {
            if (character) {
              // Character by this name already exists.
              errors.name = 'That character name is already in use.';
              return res.status(400).json(errors);
            } else {
              // Need to convert JSON string to ObjectId.
              const characterData = {
                name: req.body.name,
                indexname: indexName
              };
              if (req.body.descript) {
                characterData.descript = req.body.descript;
              }
              
              // Create and save
              new Character(characterData).save()
                .then(character => {
                  Account.findOneAndUpdate(
                    { user: req.user.id },
                    { $push: { characters: character._id } },
                    { new: true })
                    .populate('characters')
                    .then(account => res.json(account))
                    .catch(err => {
                      console.log(err);
                      errors.error = 'The server was unable to complete this action.';
                      return res.status(500).json(errors);
                    });
                })
                .catch(err => {
                  console.log(err);
                  errors.error = 'The server was unable to complete this action.';
                  return res.status(500).json(errors);
                });
            }
          })
          .catch(err => {
            console.log(err);
            errors.error = 'The server was unable to complete this action';
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.error = 'The server was unable to complete this action';
        return res.status(500).json(errors);
      });
  }
);

// DELETE api/characters/:id
// Delete a character by id
// Authentication required
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Account.findOne({ user: req.user.id })
      .then(account => {
        if (!account) {
          errors.noaccount = 'You must have an account to have a character.';
          return res.status(400).json(errors);
        }
        if (isEmpty(account.characters)) {
          errors.nochars = 'You have not yet created a character.';
          return res.status(400).json(errors);
        }
        
        const removeIndex = account.characters.findIndex(character => {
          return character._id.toString() === req.params.id;
        });
        if (removeIndex === -1) {
          errors.account = 'No such character is connected with this account.';
          return res.status(404).json();
        }
        // Splice ObjectId out of characters array.
        account.characters.splice(removeIndex, 1);
        account.save().then(account => {
          Character.findById(req.params.id)
            .then(character => {
              if (!character) {
                errors.notfound = 'No such character exists.';
                return res.status(404).json(errors);
              }
              character.remove()
                .then(() => res.json({ success: true }))
                .catch(err => {
                  console.log(err);
                  errors.error = 'The server was unable to complete this action.';
                  return res.status(500).json(errors);
                });
            })
           .catch(err => {
              console.log(err);
              errors.error = 'The server was unable to complete this action.';
              return res.status(500).json(errors);
            });
        })
        .catch(err => {
          console.log(err);
          errors.error = 'The server was unable to complete this action.';
          return res.status(500).json(errors);
        });
    })
    .catch(err => {
      console.log(err);
      errors.error = 'The server was unable to complete this action.';
      return res.status(500).json(errors);
    });
  }
);

module.exports = router;
