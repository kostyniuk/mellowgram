CREATE TABLE Room
(
  room_id BIGSERIAL,
  user1_id INTEGER NOT NULL,
  user2_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL
);

ALTER TABLE Room ADD CONSTRAINT pk_room_id
  PRIMARY KEY (room_id);

ALTER TABLE Room ADD CONSTRAINT fk_user1_id_user_info
  FOREIGN KEY (user1_id) REFERENCES user_info (user_id)
  ON DELETE CASCADE;

ALTER TABLE Room ADD CONSTRAINT fk_user2_id_user_info
  FOREIGN KEY (user2_id) REFERENCES user_info (user_id)
  ON DELETE CASCADE;

ALTER TABLE Room ADD CONSTRAINT only_one_chat_for_a_pair_of_users
 UNIQUE(user1_id, user2_id);

ALTER TABLE Room ALTER created_at
SET
DEFAULT NOW
();