DROP DATABASE IF EXISTS mydatabase;
CREATE DATABASE IF NOT EXISTS mydatabase CHARACTER SET utf8 COLLATE utf8_general_ci;
USE mydatabase;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
) CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO users (name, email) VALUES ("admin", "admin@example.com");