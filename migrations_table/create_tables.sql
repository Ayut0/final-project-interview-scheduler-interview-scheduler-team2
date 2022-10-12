-- CREATE TABLE appointment (
--     id SERIAL PRIMARY KEY NOT NULL,
--     time VARCHAR(5) NOT NULL,
--     day_id INTEGER REFERENCES day(id) NOT NULL
-- );

-- CREATE TABLE day (
--     id SERIAL PRIMARY KEY NOT NULL,
--     name VARCHAR(10) NOT NULL
-- );

-- CREATE TABLE interview (
--     id SERIAL PRIMARY KEY NOT NULL,
--     student VARCHAR(50) NOT NULL,
--     interviewer_id INTEGER REFERENCES interviewer(id) NOT NULL,
--     appointment_id INTEGER REFERENCES appointment(id) NOT NULL
-- );

-- CREATE TABLE interviewer (
--     id SERIAL PRIMARY KEY NOT NULL,
--     name VARCHAR(50) NOT NULL,
--     avatar VARCHAR(225)
-- );

-- CREATE TABLE available_interviewer(
--     id SERIAL PRIMARY KEY NOT NULL,
--     interviewer_id INTEGER REFERENCES interviewer(id) NOT NULL,
--     day_id INTEGER REFERENCES day(id) NOT NULL
-- );

