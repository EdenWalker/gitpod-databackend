-- -- see all db on server
-- show databases;
-- --create 
-- create database swimming_coach;
-- --change the active database
-- use swimming_coach;
-- --create new table
-- --name paretns with some columns
-- the 'engine = innodb' is for foreign keys
-- create table parents(
-- parent_id int unsigned auto_increment primary key,
-- name varchar(200) not null,
-- last_name varchar(200) default ''
-- ) engine = innodb;

-- -- show table
-- show tables;
-- -- for students
-- create table students(
-- student_id int unsigned auto_increment primary key,
-- name varchar(200) not null,
-- date_of_birth datetime not null
-- ) engine = innodb;
-- for altering existing table
-- alter table students add column parent_id int unsigned;
-- describe students;
-- --define parent_id in students table as foreign key

-- alter table students add constraint fk_students_parents
-- foreign key (parent_id) references parents(parent_id)

-- Create the Superhero table
CREATE TABLE Customer (
    customer_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL
);

-- Create the Product table
CREATE TABLE Product (
    product_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL
);

-- Create the Invoice table
CREATE TABLE Invoice (
    invoice_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    product_id INT UNSIGNED,
    quantity INT UNSIGNED NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE
);
