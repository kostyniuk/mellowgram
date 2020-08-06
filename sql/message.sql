CREATE TABLE Messages
(
  message_id BIGSERIAL,
  room_id INTEGER NOT NULL,
  sender_id INTEGER NOT NULL,
  context TEXT NOT NULL,
  send_at TIMESTAMP NOT NULL
);

ALTER TABLE Messages ADD CONSTRAINT pk_message_id
  PRIMARY KEY (message_id);

ALTER TABLE Messages ADD CONSTRAINT fk_sender_id_user_info
  FOREIGN KEY (sender_id) REFERENCES user_info (user_id)
  ON DELETE CASCADE;

ALTER TABLE Messages ADD CONSTRAINT fk_room_id
  FOREIGN KEY (room_id) REFERENCES room (room_id)
  ON DELETE CASCADE;


ALTER TABLE Messages ALTER send_at
SET
DEFAULT NOW
();