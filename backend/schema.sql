-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   full_name VARCHAR(100) NOT NULL,
--   email VARCHAR(100) UNIQUE NOT NULL,
--   phone_number VARCHAR(15) UNIQUE NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   role VARCHAR(20) DEFAULT 'student' NOT NULL CHECK (role IN ('student', 'organizer', 'admin'))
-- );


CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  venue VARCHAR(255) NOT NULL,
  description TEXT,
  acoustic_night BOOLEAN,
  stalls BOOLEAN,
  stall_count INTEGER,
  capacity INTEGER,
  organizer VARCHAR(255),
  category VARCHAR(50),
  image VARCHAR(500)
);

-- CREATE TABLE reviews (
--   id SERIAL PRIMARY KEY,
--   eventId INTEGER REFERENCES events(id) ON DELETE CASCADE,
--   rating INTEGER NOT NULL,
--   comment TEXT,
--   date TIMESTAMP DEFAULT NOW(),
--   userName VARCHAR(255) DEFAULT 'Anonymous Student',
--   helpful INTEGER DEFAULT 0
-- );

drop table events;
