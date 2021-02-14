CREATE TABLE mtm_user_language (
    user_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
);

ALTER TABLE mtm_user_language ADD PRIMARY KEY (user_id, language_id);

ALTER TABLE mtm_user_language ADD CONSTRAINT fk_User_Id
  FOREIGN KEY (user_id) REFERENCES User_info (user_id)
  ON DELETE CASCADE;

ALTER TABLE mtm_user_language ADD CONSTRAINT fk_Language_Id
  FOREIGN KEY (language_id) REFERENCES Language (id)
  ON DELETE CASCADE;