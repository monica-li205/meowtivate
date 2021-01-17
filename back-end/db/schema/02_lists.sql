DROP TABLE IF EXISTS lists CASCADE;

CREATE TABLE lists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE
);