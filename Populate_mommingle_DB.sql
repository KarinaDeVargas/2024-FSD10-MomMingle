
-- Use the MomMingle Database
USE mommingle;

-- Insert sample users
INSERT INTO users (username, password, email) VALUES
('user1', 'password1', 'user1@example.com'),
('user2', 'password2', 'user2@example.com'),
('user3', 'password3', 'user3@example.com'),
('user4', 'password4', 'user4@example.com'),
('user5', 'password5', 'user5@example.com'),
('user6', 'password6', 'user6@example.com'),
('user7', 'password7', 'user7@example.com'),
('user8', 'password8', 'user8@example.com'),
('user9', 'password9', 'user9@example.com'),
('user10', 'password10', 'user10@example.com');

-- Insert sample events
INSERT INTO events (title, description, organizer_id, event_date, location, category, activities, age_range) VALUES
('Playdate at the Park', 'Join us for a fun playdate at the local park!', 1, '2024-03-01 10:00:00', 'Central Park', 'Playdate', 'Play', '0-5 years'),
('Mom\'s Night Out', 'An evening of relaxation and bonding for moms.', 2, '2024-03-05 19:00:00', 'Café Bella', 'Social', 'Dinner', 'Any age'),
('Yoga in the Park', 'Relax and rejuvenate with a yoga session in the park.', 3, '2024-03-10 08:00:00', 'Riverside Park', 'Fitness', 'Yoga', 'Any age'),
('Family Picnic', 'Enjoy a lovely picnic with other families!', 4, '2024-03-15 12:00:00', 'Sunset Park', 'Social', 'Picnic', 'Any age'),
('Arts and Crafts Workshop', 'Get creative with arts and crafts!', 5, '2024-03-20 14:00:00', 'Community Center', 'Crafts', 'Crafting', 'Any age'),
('Parenting Q&A Session', 'Join us for a session of parenting tips and advice.', 6, '2024-03-25 11:00:00', 'Local Library', 'Parenting', 'Discussion', 'Any age'),
('Cooking Class', 'Learn new recipes and cooking techniques!', 7, '2024-03-28 17:00:00', 'Culinary Academy', 'Cooking', 'Cooking', 'Any age'),
('Outdoor Adventure', 'Embark on an outdoor adventure with other families!', 8, '2024-03-30 09:00:00', 'Nature Reserve', 'Outdoor', 'Hiking', 'Any age'),
('Book Club Meeting', 'Discuss and explore new books with fellow book lovers.', 9, '2024-04-02 18:00:00', 'Bookstore', 'Literature', 'Book Discussion', 'Any age'),
('Fitness Bootcamp', 'Get fit and energized with a challenging fitness bootcamp!', 10, '2024-04-05 07:00:00', 'Fitness Center', 'Fitness', 'Bootcamp', 'Any age');


