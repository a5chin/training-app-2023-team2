CREATE DATABASE IF NOT EXISTS training;
USE training;

CREATE TABLE IF NOT EXISTS hello_worlds(
  lang    VARCHAR(2) NOT NULL PRIMARY KEY,
  message VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
  id         VARCHAR(26)  PRIMARY KEY,
  name       VARCHAR(40)  NOT NULL,
  email      VARCHAR(256) NOT NULL,
  password   VARCHAR(100) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME     NULL
);

CREATE TABLE IF NOT EXISTS posts(
  id         VARCHAR(26)  PRIMARY KEY,
  user_id    VARCHAR(26)  NOT NULL,
  parent_id  VARCHAR(26)  NULL,
  body       TEXT         NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME     NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS favorites(
  post_id    VARCHAR(26)  NOT NULL,
  user_id    VARCHAR(26)  NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME     NULL,
  PRIMARY KEY (post_id, user_id)
);