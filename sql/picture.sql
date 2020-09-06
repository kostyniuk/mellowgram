CREATE TABLE Picture
(

  picture_id BiGSERIAL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  path VARCHAR(100) NOT NULL

);

ALTER TABLE Picture ADD CONSTRAINT pkPicture
  PRIMARY KEY (picture_id);

ALTER TABLE Picture ALTER created_at SET DEFAULT NOW();

ALTER TABLE Picture ADD CONSTRAINT fk_Picture_User_Id
  FOREIGN KEY (user_id) REFERENCES User_info (user_id)
  ON DELETE CASCADE;