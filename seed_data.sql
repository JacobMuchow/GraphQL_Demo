DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS festival;

CREATE TABLE festival (
    id serial PRIMARY KEY,
    name text,
    description text
);

CREATE TABLE artist (
    id serial PRIMARY KEY,
    name text,
    description text
);

CREATE TABLE event (
    id serial PRIMARY KEY,
    festivalId serial REFERENCES festival,
    artistId serial REFERENCES artist,
    description text,
    event_time timestamp
);

INSERT INTO artist (name, description) VALUES
    ('Buddy Guy', 'At age 65, he''s a Rock and Roll Hall of Fame inductee, a...'),
    ('Lucinda Williams', 'As a rule, you can divide music into three categories...');

INSERT INTO festival (name, description) VALUES
    ('Roots N Blues N BBQ Festival', 'Annual Roots N Blues festival in Columbia, MO');

INSERT INTO event (festivalId, artistId, event_time) VALUES
    (1, 1, '2015-09-25 21:30:00'),
    (1, 2, '2015-09-25 21:30:00');