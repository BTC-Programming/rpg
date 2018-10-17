const express = require('express');

const router = express.Router();

const ctrlTest = require('../controllers/ctrlTest');

router.get('/test', ctrlTest.getTestUser);
router.post('/test', ctrlTest.editTestUser);

module.exports = router;
