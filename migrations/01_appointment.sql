CREATE TABLE appointment (
  id SERIAL PRIMARY KEY NOT NULL,
  time VARCHAR(5) NOT NULL,
  day_id INTEGER REFERENCES day(id)
);