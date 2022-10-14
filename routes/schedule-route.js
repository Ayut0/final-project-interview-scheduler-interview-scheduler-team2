//All about interviewers and interviews
// /interviewers: See the available interviewers (GET): Yuto

const express = require('express');
const router = express.Router();
const scheduleControllers = require('../controllers/schedule')

//Get all the available interviewers
router.get('/interviews', scheduleControllers.getAllTheAvailableInterviewer);
router.get('/:day', scheduleControllers.getAllTheInterviewByGivenDay);
router.get('/interviewers/:day', scheduleControllers.getAvailableInterviewersForGivenDay)

module.exports = router;