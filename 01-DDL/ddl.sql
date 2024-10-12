-- see all db on server
show databases;
--create 
create database swimming_coach;
--change the active database
use swimming_coach;
--create new table
--name paretns with some columns
the 'engine = innodb' is for foreign keys
create table parents(
parent_id int unsigned auto_increment primary key,
name varchar(200) not null,
last_name varchar(200) default ''
) engine = innodb;

-- show table
show tables;
-- for students
create table students(
student_id int unsigned auto_increment primary key,
name varchar(200) not null,
date_of_birth datetime not null
) engine = innodb;
for altering existing table
alter table students add column parent_id int unsigned;
describe students;
--define parent_id in students table as foreign key

alter table students add constraint fk_students_parents
foreign key (parent_id) references parents(parent_id)