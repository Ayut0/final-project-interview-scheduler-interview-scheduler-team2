--SELECT * FROM appointment;
--SELECT day_id,COUNT(appointment.*) AS appointments_count,COUNT(interview.*) AS interviews_count FROM appointment LEFT JOIN interview ON interview.appointment_id = appointment.id GROUP BY day_id;
SELECT day_id,COUNT(appointment.*) AS appointments_count,COUNT(interview.*) AS interviews_count, day.time FROM appointment LEFT JOIN interview ON interview.appointment_id = appointment.id LEFT JOIN day ON day.id = appointment.day_id GROUP BY day_id, day.time ORDER BY day_id;