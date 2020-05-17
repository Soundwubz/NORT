DROP DATABASE IF EXISTS NORT;

CREATE DATABASE NORT;

USE NORT;

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `Users` (username, password)
VALUES ('test', 'p@$$w0rd');
