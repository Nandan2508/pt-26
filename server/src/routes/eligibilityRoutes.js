const express = require('express');
const { simulateEligibility } = require('../controllers/eligibilityController');

const router = express.Router();

router.post('/simulate', simulateEligibility);

module.exports = router;
