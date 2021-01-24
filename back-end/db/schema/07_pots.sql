DROP TABLE IF EXISTS pots CASCADE;

CREATE TABLE pots (
  id SERIAL PRIMARY KEY NOT NULL,
  pot_name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL
);