CREATE TABLE interview (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  interviewer_id INTEGER REFERENCES interviewer(id),
  appointment_id INTEGER REFERENCES appointment(id)
);