//All about interviewers and interviews
// /interviewers: See the available interviewers (GET): Yuto

const express = require('express');
const router = express.Router();

//Get all the available interviewers
router.get('/interviewers', (req, res, next) => {
    res.json({message: 'Get all the available interviewers'})
});

module.exports = router;