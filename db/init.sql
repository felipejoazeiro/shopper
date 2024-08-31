
CREATE TABLE costumer(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    costumer_code VARCHAR(50)
);

CREATE TABLE measure(
    id SERIAL PRIMARY KEY,
    measure_uuid VARCHAR(50),
    measure_datetime TIMESTAMP,
    measure_type VARCHAR(10),
    measure_value INTEGER,
    has_confirmed BOOLEAN,
    image_url VARCHAR(200),
    fk_user VARCHAR(50)
);


INSERT INTO costumer (name, costumer_code) VALUES ('Felipe', 'AAAA01');
INSERT INTO costumer (name, costumer_code) VALUES ('Douglas', 'AAAA02');
INSERT INTO costumer (name, costumer_code) VALUES ('Ana', 'AAAA03');
INSERT INTO costumer (name, costumer_code) VALUES ('Guilherme', 'AAAA04');


INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image875', '2024-06-24', 'WATER', 250, true, 'google.com/image-01', 'AAAA01');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image875', '2024-06-24', 'GAS', 25, true, 'google.com/image-01', 'AAAA01');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image875', '2024-07-24', 'GAS', 90, true, 'google.com/image-01', 'AAAA01');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user)
 VALUES ('image876', '2024-07-24', 'WATER', 350, true, 'google.com/image-02', 'AAAA01');


INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image877', '2024-08-24', 'WATER', 450, true, 'google.com/image-03', 'AAAA01');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image878', '2024-09-24', 'WATER', 150, true, 'google.com/image-04', 'AAAA01');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image875', '2024-06-24', 'WATER', 250, true, 'google.com/image-01', 'AAAA02');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image875', '2024-06-24', 'GAS', 25, true, 'google.com/image-01', 'AAAA02');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image875', '2024-07-24', 'GAS', 90, true, 'google.com/image-01', 'AAAA02');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image876', '2024-07-24', 'WATER', 350, true, 'google.com/image-02', 'AAAA02');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image875', '2024-07-24', 'GAS', 90, true, 'google.com/image-01', 'AAAA03');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image876', '2024-07-24', 'WATER', 350, true, 'google.com/image-02', 'AAAA03');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image877', '2024-08-24', 'WATER', 450, true, 'google.com/image-03', 'AAAA03');

INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) 
VALUES ('image878', '2024-09-24', 'WATER', 150, true, 'google.com/image-04', 'AAAA03');