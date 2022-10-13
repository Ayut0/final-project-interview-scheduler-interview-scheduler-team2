const { Pool } = require('pg');
const HttpError = require('../models/http-error');

const dbCredentials = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    post: process.env.DB_PORT
};

const getAllTheAvailableInterviewer = async (req, res, next) =>{
    const pool = new Pool(dbCredentials);
    try{
        const res = await pool.query('SELECT * FROM available_interviewer')
        const result = res.rows;
        console.log(result);
    }catch(err){
        const error = new HttpError('Could not get any available interviewers.', 500);
        return next(error)
    }finally{
        pool.end()
    }
}

exports.getAllTheAvailableInterviewer = getAllTheAvailableInterviewer;