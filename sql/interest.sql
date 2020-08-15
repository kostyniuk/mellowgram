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