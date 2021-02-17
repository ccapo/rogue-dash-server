--
-- File generated with SQLiteStudio v3.1.1 on Fri Feb 12 00:26:22 2021
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: user
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id           INTEGER  PRIMARY KEY AUTOINCREMENT,
    uuid         TEXT     NOT NULL,
    name         TEXT     NOT NULL,
    passwordHash TEXT     NOT NULL,
    score        INTEGER  DEFAULT (0),
    createdAt    DATETIME DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW') ),
    updatedAt    DATETIME DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW') ) 
);


-- Table: user_history
DROP TABLE IF EXISTS user_history;

CREATE TABLE user_history (
    id        INTEGER  PRIMARY KEY AUTOINCREMENT,
    uuid      TEXT     NOT NULL,
    name      TEXT     NOT NULL,
    score     INTEGER  DEFAULT (0),
    createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW') ) 
);


-- Index: user_uuid_name_unique_idx
DROP INDEX IF EXISTS user_uuid_name_unique_idx;

CREATE UNIQUE INDEX user_uuid_name_unique_idx ON user (
    uuid,
    name
);


-- Trigger: updateUser
DROP TRIGGER IF EXISTS updateUser;
CREATE TRIGGER updateUser
         AFTER UPDATE
            ON user
      FOR EACH ROW
          WHEN NEW.updatedAt = OLD.updatedAt
BEGIN
    UPDATE user
       SET updatedAt = strftime('%Y-%m-%d %H:%M:%f', 'NOW') 
     WHERE id = OLD.rowid;
END;


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
