CREATE TABLE Interest
(
  interest_id BIGSERIAL,
  interest_category VARCHAR(64) NOT NULL,
  interest_name VARCHAR(64) NOT NULL,
  interest_emoji VARCHAR(8)
)

ALTER TABLE Interest ADD CONSTRAINT pk_Interest_id
  PRIMARY KEY (interest_id);


ALTER TABLE Interest ADD CONSTRAINT unique_interest_name
 UNIQUE(interest_name);



INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Most popular',
    'Music', '🎵');

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Most popular',
    'Movies', '🎥' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Most popular',
    'Sports', '⚽️' );



INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Basketball', '🏀' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Football', '🏈' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Soccer', '⚽️' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Volleyball', '🏐' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Marathon running', '🏃' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Skiing', '⛷' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Tennis', '🎾' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Cycling', '🚵‍♀️' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Swimming', '🏊‍♀️' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Baseball', '⚾️' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Sport',
    'Mountain climbing', '🧗‍♀️' );


INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Chess', '♟' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Playing a musical instrument', '🎸' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Reading', '📖' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Writing', '✍🏼' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Sketching', '✏️⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Photography', '📸⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Design', '💻' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Blog writing', '⌨️⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Analytical Thinking',
    'Painting', '🖼' );


INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Social Interest⁣⁣',
    'Politics', '👩‍💼' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Social Interest⁣⁣',
    'Volunteering', '😚' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Social Interest⁣⁣',
    'Public speaking', '🗣⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Social Interest⁣⁣',
    'Exploring other cultures', '🗺' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Social Interest⁣⁣',
    'Dancing', '💃' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Social Interest⁣⁣',
    'Camping', '🏕' );


INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Science⁣⁣',
    'Programming', '👨‍💻⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Science⁣⁣',
    'History', '🦽⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Science⁣⁣',
    'Geography', '✈️' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Science⁣⁣',
    'Biology', '🧬⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Science⁣⁣',
    'Chemistry', '🧪' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Science⁣⁣',
    'Physics', '🚀⁣⁣' );


INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Finance',
    'Marketing', '📈⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Finance',
    'Economics', '💵' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Finance',
    'Blockchain', '🔐' );


INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Archery', '🏹' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Boardgames', '🧩⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Gardening', '🍀⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Baking', '👩‍🍳' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Journaling', '🎙⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Calligraphy', '✒️⁣⁣' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Fencing', '🤺' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Theater', '🎭' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Yoga', '🧘‍♀️' );

INSERT INTO Interest
  (interest_category, interest_name, interest_emoji)
VALUES
  ('Unique',
    'Languages', '🇫🇷' );

UPDATE interest SET interest_color = '#FBEEE6' WHERE interest_category = 'Most popular';
UPDATE interest SET interest_color = '#FFE5D8' WHERE interest_category = 'Sport';
UPDATE interest SET interest_color = '#FFCAD4' WHERE interest_category = 'Analytical Thinking';
UPDATE interest SET interest_color = '#EBB8C0' WHERE interest_category = 'Social Interest⁣⁣';
UPDATE interest SET interest_color = '#F3ABB6' WHERE interest_category = 'Science⁣⁣';
UPDATE interest SET interest_color = '#CE9DAD' WHERE interest_category = 'Finance';
UPDATE interest SET interest_color = '#988189' WHERE interest_category = 'Unique';
