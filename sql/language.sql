CREATE TABLE Language
(
  id BIGSERIAL,
  code VARCHAR(4) NOT NULL,
  name VARCHAR(64) NOT NULL,
  native_name VARCHAR(128) NOT NULL
);
