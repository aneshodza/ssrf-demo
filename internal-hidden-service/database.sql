CREATE DATABASE IF NOT EXISTS customer_data;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(100),
  birthdate DATE
);

CREATE TABLE pills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10, 2)
);

CREATE TABLE customer_pills (
  customer_id INTEGER REFERENCES customers(id),
  pill_id INTEGER REFERENCES pills(id),
  PRIMARY KEY (customer_id, pill_id)
);

INSERT INTO customers (firstname, lastname, email, birthdate) VALUES
  ('John', 'Doe', 'john.doe@example.com', '1980-01-01'),
  ('Jane', 'Doe', 'jane.doe@example.com', '1985-01-01'),
  ('Alice', 'Smith', 'alice.smith@example.com', '1990-01-01');

INSERT INTO pills (name, description, price) VALUES
  ('Ibuprofen', 'Helps with headaches', 10.00),
  ('Paracetamol', 'Helps with pain relief', 5.00),
  ('Aspirin', 'Helps with blood thinning', 8.00),
  ('Codeine', 'Helps with throat pain relief', 15.00);

INSERT INTO customer_pills (customer_id, pill_id) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (3, 4);

