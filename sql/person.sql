CREATE TABLE Person (
  person_id INTEGER,
  age INTEGER NOT NULL,
  bio VARCHAR(64) NOT NULL,
  email VARCHAR(32) NOT NULL,
  fullName VARCHAR(64) NOT NULL,
  picture VARCHAR(100) NOT NULL,
  occupation VARCHAR(32) NOT NULL,
  phone_number VARCHAR(16),
  based_in VARCHAR(64),
  number_of_posts INTEGER NOT NULL
);

ALTER TABLE Person ADD CONSTRAINT pkPerson
  PRIMARY KEY (person_id);

ALTER TABLE Person ALTER number_of_posts SET DEFAULT 0;
ALTER TABLE Person ALTER bio SET DEFAULT ('');
ALTER TABLE Person ALTER picture SET DEFAULT ('./public/uploads/user_default.png');

ALTER TABLE Person ADD CONSTRAINT ageGreater0 CHECK(age > 0); 

ALTER TABLE Person ADD CONSTRAINT uniqueEmail
  UNIQUE (email);

ALTER TABLE Person ADD CONSTRAINT fk_Person_User_Id
  FOREIGN KEY (person_id) REFERENCES User_info (user_id)
  ON DELETE CASCADE;
