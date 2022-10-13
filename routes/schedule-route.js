//All about interviewers and interviews
// /interviewers: See the available interviewers (GET): Yuto

const express = require('express');
const router = express.Router();
const scheduleControllers = require('../controllers/schedule')

//Get all the available interviewers
router.get('/interviewers', scheduleControllers.getAllTheAvailableInterviewer);

module.exports = router;