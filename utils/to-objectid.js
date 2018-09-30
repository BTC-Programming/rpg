const ObjectId = require('mongoose').Types.ObjectId;

// Take an ObjectId hex string and convert to the object type.
const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid argument passed to isObjectId');
  }
  return ObjectId(id);
};

module.exports = toObjectId;
