-- create database in postgres
CREATE DATABASE mytodolist;

-- create table in database "mytodolist"
CREATE TABLE todo
(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    isDone BOOLEAN NOT NULL DEFAULT FALSE
);