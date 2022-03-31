CREATE DATABASE todo;
-- CREATE TYPE user_type AS ENUM ('admin', 'user');

CREATE TABLE userdo(id uuid not null PRIMARY KEY,firstname varchar unique not null,lastname varchar not null,password varchar not null,age varchar not null);

    -- type user_type not null DEFAULT 'user'