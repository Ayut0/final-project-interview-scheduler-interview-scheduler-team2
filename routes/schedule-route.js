//All about interviewers and interviews
// /interviewers: See the available interviewers (GET): Yuto

const express = require('express');
const router = express.Router();
const scheduleControllers = require('../controllers/schedule')

//Get the confirmed interview
router.get('/interviews', scheduleControllers.getAllTheAvailableInterviewer);

//Get the interviews based on given day
router.get('/:day', scheduleControllers.getAllTheInterviewByGivenDay);
//Get all the available interviewers
router.get('/interviewers/:day', scheduleControllers.getAvailableInterviewersForGivenDay);

//CRUD
//Delete
router.get('/delete/:id', scheduleControllers.deleteAppointment);

//Create
router.get('/create/:id/:interviewer/:student', scheduleControllers.createAppointment)


module.exports = router;