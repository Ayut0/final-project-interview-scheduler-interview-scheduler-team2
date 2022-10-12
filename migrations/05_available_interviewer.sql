CREATE TABLE available_interviewer (
  id SERIAL PRIMARY KEY NOT NULL,
  interviewer_id INTEGER REFERENCES interviewer(id),
  day_id INTEGER REFERENCES day(id)
);