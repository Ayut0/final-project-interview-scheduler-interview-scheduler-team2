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
        const res = await pool.query('SELECT * FROM available_interviewer');
        const result = res.rows;
        // console.log(result);
    }catch(err){
        const error = new HttpError('Could not get any available interviewers.', 500);
        return next(error);
    }finally{
        pool.end();
    };
};

const getAllTheInterviewByGivenDay = async (req, res, next) =>{
    // console.log('day', req.params);
    const day = req.params.day;
    const pool = new Pool(dbCredentials);

    const getAvailableInterviewGivenDayQuery = (`
        SELECT appointment.id AS appointment_id, interview.id, appointment.time AS appointment_time, interview.name AS student_name, day.time AS date, interviewer.name, interviewer.avatar
        FROM appointment
        FULL JOIN interview
        ON interview.appointment_id = appointment.id
        JOIN day
        ON day.id = appointment.day_id
        FULL JOIN interviewer
        ON interview.interviewer_id = interviewer.id
        WHERE day.time = '${day}'
        ORDER BY appointment.id;
    `);

    let appointmentArray = [];
    let appointmentObj;
    try{
        // console.log('query', getAvailableInterviewGivenDayQuery)
        const res = await pool.query(getAvailableInterviewGivenDayQuery)
        const result = res.rows;

        result.forEach((appointment) =>{
            if(appointment.id !== null){
                appointmentArray.push(
                    {
                        id: appointment.appointment_id,
                        time: appointment.appointment_time,
                        interview: {
                            student: appointment.student_name,
                            interviewer:{
                                id: appointment.interviewer_id,
                                name: appointment.name,
                                avatar: appointment.avatar
                            }
                        }
                    }
                )
            }else{
                appointmentArray.push(
                    {
                        id: appointment.appointment_id,
                        time: appointment.appointment_time,
                    }
                )
            }
        })

        appointmentObj = appointmentArray.reduce((obj, data) =>{
            obj[data.id] = data;
            return obj;
        }, {});


    }catch(err){
        const error = new HttpError('Could not get any available interviews available on that day. Please try with another day.', 500);
        console.log('err', err.message)
        return next(error);
    }finally{
        pool.end();
    };
    res.json(appointmentObj);
}

const getAvailableInterviewersForGivenDay = async(req, res, next) =>{

    const day = req.params.day;

    const pool = new Pool(dbCredentials);
    //Change the data in the table. Make it random.
    //Same as the interviewer array id, name, avatar. Date isn't needed.
    //Filtered by day availability
    const getAvailableInterviewersGivenDayQuery = (`
        SELECT interviewer.id AS id, interviewer.name AS name, interviewer.avatar AS avatar
        FROM available_interviewer
        JOIN day
        ON available_interviewer.day_id = day.id
        JOIN interviewer
        ON available_interviewer.interviewer_id = interviewer.id
        WHERE day.time = '${day}';
    `);
    let interviewers = [];
    try{
        // console.log('query', getAvailableInterviewersGivenDayQuery)
        const res = await pool.query(getAvailableInterviewersGivenDayQuery);
        const result = res.rows;
        // console.log(result);
        result.forEach(interviewer => {
            interviewers.push(interviewer)
        });
        // console.log( 'pushed' ,interviewers);

    }catch(err){
        console.log(err.message)
        const error = new HttpError('Could not get any available interviewers available on that day. Please try with another day.'
        , 500);
        return next(error);
    }finally{
        pool.end();
    };

    res.json(interviewers);
};

//Create
const createAppointment = async(req, res, next) =>{
    const data = req.params;
    console.log('received data', data);

    const pool = new Pool(dbCredentials);

    const insertAppointmentQuery = (`
        INSERT INTO interview(name, interviewer_id ,appointment_id)
        VALUES('${data.student}', ${data.interviewer} ,${data.id});
    `);
    
    try{
        const res = await pool.query(insertAppointmentQuery);
        console.log(res);
    }catch(err){
        console.log(err.message)
        const error = new HttpError('Could not register the interview. Please try with another day.', 500);
        return next(error);
    }finally{
        pool.end();
    }

   
}

//Delete
const deleteAppointment = async(req, res, next) =>{
    const id = req.params.id;
    console.log('backend_delete_id', id)
    const pool = new Pool(dbCredentials);
    const deleteQuery = (`
        DELETE FROM interview
        WHERE appointment_id = '${id}';
    `)

    try{
        const res = await pool.query(deleteQuery);
    }catch(err){
        console.log(err.message)
        const error = new HttpError('Could not delete the interview. Please try with another day.', 500);
        return next(error);
    }finally{
        pool.end();
    }

}

exports.getAllTheAvailableInterviewer = getAllTheAvailableInterviewer;
exports.getAllTheInterviewByGivenDay = getAllTheInterviewByGivenDay;
exports.getAvailableInterviewersForGivenDay = getAvailableInterviewersForGivenDay;
exports.deleteAppointment = deleteAppointment;
exports.createAppointment = createAppointment