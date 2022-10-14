const { Pool } = require("pg");
const HttpError = require("../models/http-error");

const dbCredentials = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  post: process.env.DB_PORT,
};

const getInterviewsPerDay = async (req, res, next) => {
  const pool = new Pool(dbCredentials);
  let days = {};

  try {
    const res = await pool.query(
      "SELECT day_id,COUNT(appointment.*) AS appointments_count,COUNT(interview.*) AS interviews_count, day.time FROM appointment LEFT JOIN interview ON interview.appointment_id = appointment.id LEFT JOIN day ON day.id = appointment.day_id GROUP BY day_id, day.time ORDER BY day_id;"
    );
    const result = res.rows;
    console.log(result);

    result.forEach((element) => {
      const finalSpots =
        Number(element.appointments_count) - Number(element.interviews_count);

      days[element.time] = {
        id: element.day_id,
        name: element.time,
        spots: finalSpots,
      };
    });
  } catch (err) {
    const error = new HttpError(
      "Could not get any appointment on these days.",
      500
    );
    return next(error);
  } finally {
    res.json(days);
    pool.end();
  }
};

// make a request to the database
// receive the days back + number appointments + number interviews for each day
// calculate how many spots we have available for each day
// return that to the client
// example of the return in mocks - days.json

exports.getInterviewsPerDay = getInterviewsPerDay;
