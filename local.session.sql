-- CREATE TABLE IF NOT EXISTS users (
--     id SERIAL PRIMARY KEY,
--     full_name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     phone_number VARCHAR(15) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(20) DEFAULT 'student' NOT NULL CHECK (role IN ('student', 'organizer', 'admin'))
-- );

-- drop table events;

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  venue VARCHAR(255) NOT NULL,
  description TEXT,         -- changed to TEXT for long descriptions
  acoustic_night BOOLEAN,
  stalls BOOLEAN,
  stall_count INTEGER,
  capacity INTEGER,
  organizer VARCHAR(255),
  category VARCHAR(50),
  image TEXT                -- changed to TEXT to store base64 strings
);

