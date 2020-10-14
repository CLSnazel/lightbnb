
-- USERS --
INSERT INTO users (name, email, password) VALUES 
('Arin Hanson', 'egoraptor@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' ),
('Daniel Avidan', 'danny@grumps.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Barry Berrymore' , 'berry@more.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' ), ( 'Help NeedJob', 'givejob@me.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' ), ( 'Raven Roth', 'azarath@mz.com' , '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- PROPERTIES --
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES 
(5, 'Come on over!', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 255, 1, 1, 1, 'Canada', '123-5657 Magic Ave', 'Coquitlam', 'British Columbia', 'V5A1S6', 'true' ),
(5, 'Water is Fine!', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 255, 1, 1, 1, 'Canada', '123-5657 Magic Ave', 'Coquitlam', 'British Columbia', 'V5A1S6', 'true'),
(5, 'Escape Room BnB!', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 255, 1, 1, 1, 'Canada', '123-5657 Magic Ave', 'Coquitlam', 'British Columbia', 'V5A1S6', 'false');

-- RESERVATIONS --
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES
( '2018-09-11', '2018-09-26', 1, 1),
( '2019-01-04', '2019-02-01', 1, 2),
( '2021-10-01', '2021-10-14', 1, 3),
( '2014-10-21', '2014-10-21', 1, 4),
( '2016-07-17', '2016-08-01', 2, 1),
( '2018-05-01', '2018-05-27', 2, 2),
( '2022-10-04', '2022-10-23', 2, 3),
( '2015-09-13', '2015-09-30', 3, 4),
( '2023-05-27', '2023-05-28', 3, 1),
( '2023-04-23', '2023-05-02', 3, 2);

-- REVIEWS --

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES
(1, 1, 1, 5, 'messages here'),
(2, 1, 2, 4, 'messages here'),
(3, 1, 3, 3, 'messages here'),
(1, 2, 5, 5, 'messages here');