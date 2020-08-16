CREATE TABLE Users_Interests_Map
(
  map_id BIGSERIAL,
  user_id INTEGER NOT NULL,
  interest_id INTEGER NOT NULL,
);

ALTER TABLE Users_Interests_Map ADD CONSTRAINT pk_Interest_Users_id
  PRIMARY KEY (map_id);

ALTER TABLE Users_Interests_Map ADD CONSTRAINT fk_User_Id
  FOREIGN KEY (user_id) REFERENCES User_info (user_id)
  ON DELETE CASCADE;

ALTER TABLE Users_Interests_Map ADD CONSTRAINT fk_Interest_Id
  FOREIGN KEY (interest_id) REFERENCES Interest (interest_id)
  ON DELETE CASCADE;