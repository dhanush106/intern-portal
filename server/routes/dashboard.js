const express = require('express');
const router = express.Router();
const { getUserDashboard, addDonation } = require('../controllers/dashboardController');

router.get('/:userId', getUserDashboard);
router.post('/:userId/donate', addDonation);


module.exports = router;