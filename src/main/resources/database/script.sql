INSERT INTO users (sex, email, first_name, last_name, user_name, password, address) VALUES
                                                                                        (1, 'alice@example.com', 'Alice', 'Nguyen', 'alice', 'pwd1', '123 Main St'),
                                                                                        (0, 'bob@example.com', 'Bob', 'Tran', 'bob', 'pwd2', '456 Elm St'),
                                                                                        (1, 'charlie@example.com', 'Charlie', 'Pham', 'charlie', 'pwd3', '789 Pine St'),
                                                                                        (0, 'diana@example.com', 'Diana', 'Le', 'diana', 'pwd4', '321 Oak St'),
                                                                                        (1, 'edward@example.com', 'Edward', 'Hoang', 'edward', 'pwd5', '654 Maple St'),
                                                                                        (0, 'fiona@example.com', 'Fiona', 'Do', 'fiona', 'pwd6', '987 Birch St'),
                                                                                        (1, 'george@example.com', 'George', 'Vu', 'george', 'pwd7', '159 Cedar St'),
                                                                                        (0, 'helen@example.com', 'Helen', 'Ngo', 'helen', 'pwd8', '753 Walnut St'),
                                                                                        (1, 'ian@example.com', 'Ian', 'Mai', 'ian', 'pwd9', '852 Cherry St'),
                                                                                        (0, 'jane@example.com', 'Jane', 'Lam', 'jane', 'pwd10', '951 Spruce St');

INSERT INTO roles (role_name) VALUES
                                  ('Admin'),
                                  ('User'),
                                  ('Staff'),
                                  ('Manager');

INSERT INTO users_roles (user_id, role_id) VALUES
                                               (1,1),
                                               (2,2),
                                               (3,2),
                                               (4,2),
                                               (5,2),
                                               (6,2),
                                               (7,2),
                                               (8,3),
                                               (9,4),
                                               (10,2);

INSERT INTO genres (genre_name) VALUES
                                    ('Science Fiction'),
                                    ('Romance'),
                                    ('History'),
                                    ('Fantasy'),
                                    ('Biography'),
                                    ('Thriller'),
                                    ('Mystery'),
                                    ('Self Help'),
                                    ('Poetry'),
                                    ('Children');

INSERT INTO books (isbn, quantity, rating, author, name, description, original_price, discounted_price) VALUES
                                                                                                            (9781111111111, 10, 4.8, 'Author A', 'Book A', 'Description A', 25.0, 20.5),
                                                                                                            (9782222222222, 5, 4.2, 'Author B', 'Book B', 'Description B', 18.0, 15.0),
                                                                                                            (9783333333333, 7, 4.5, 'Author C', 'Book C', 'Description C', 27.0, 22.3),
                                                                                                            (9784444444444, 3, 4.0, 'Author D', 'Book D', 'Description D', 14.0, 10.9),
                                                                                                            (9785555555555, 8, 4.1, 'Author E', 'Book E', 'Description E', 22.0, 18.7),
                                                                                                            (9786666666666, 12, 4.9, 'Author F', 'Book F', 'Description F', 30.0, 25.0),
                                                                                                            (9787777777777, 4, 3.8, 'Author G', 'Book G', 'Description G', 12.0, 9.5),
                                                                                                            (9788888888888, 9, 4.3, 'Author H', 'Book H', 'Description H', 16.0, 13.3),
                                                                                                            (9789999999999, 6, 4.7, 'Author I', 'Book I', 'Description I', 21.0, 17.8),
                                                                                                            (9780000000000, 15, 4.6, 'Author J', 'Book J', 'Description J', 26.0, 21.0);

INSERT INTO books_genres (book_id, genre_id) VALUES
                                                 (1,1),
                                                 (2,2),
                                                 (3,3),
                                                 (4,4),
                                                 (5,5),
                                                 (6,6),
                                                 (7,7),
                                                 (8,8),
                                                 (9,9),
                                                 (10,10);

INSERT INTO payment_methods (fee, name) VALUES
                                            (0, 'Credit Card'),
                                            (1, 'Cash on Delivery'),
                                            (0, 'Paypal'),
                                            (0, 'Bank Transfer'),
                                            (1.5, 'COD Express'),
                                            (0, 'Apple Pay'),
                                            (0, 'Google Pay'),
                                            (0, 'Amazon Pay'),
                                            (0, 'Bitcoin'),
                                            (0, 'Stripe');

-- shipping_methods (10 dòng)
INSERT INTO shipping_methods (fee, name) VALUES
                                             (5, 'Standard Shipping'),
                                             (10, 'Express Shipping'),
                                             (3, 'Economy Shipping'),
                                             (7, 'Two-Day Shipping'),
                                             (12, 'Overnight Shipping'),
                                             (6, 'Local Pickup'),
                                             (8, 'International Shipping'),
                                             (4, 'Drone Delivery'),
                                             (5, 'In-Store Pickup'),
                                             (15, 'Same Day Delivery');

INSERT INTO orders (payment_method_id, payment_status, shipping_method_id, total_price, user_id, shipping_date, address) VALUES
                                                                                                                             (1, b'1', 1, 50, 1, '2025-06-10 10:00:00', '123 Main St'),
                                                                                                                             (2, b'0', 2, 25, 2, '2025-06-11 15:00:00', '456 Elm St'),
                                                                                                                             (3, b'1', 3, 30, 3, '2025-06-12 12:00:00', '789 Pine St'),
                                                                                                                             (4, b'1', 4, 40, 4, '2025-06-13 18:00:00', '321 Oak St'),
                                                                                                                             (5, b'0', 5, 55, 5, '2025-06-14 14:00:00', '654 Maple St'),
                                                                                                                             (6, b'1', 6, 60, 6, '2025-06-15 09:00:00', '987 Birch St'),
                                                                                                                             (7, b'1', 7, 20, 7, '2025-06-16 11:00:00', '159 Cedar St'),
                                                                                                                             (8, b'0', 8, 35, 8, '2025-06-17 13:00:00', '753 Walnut St'),
                                                                                                                             (9, b'1', 9, 45, 9, '2025-06-18 17:00:00', '852 Cherry St'),
                                                                                                                             (10, b'0', 10, 70, 10, '2025-06-19 19:00:00', '951 Spruce St');

INSERT INTO order_details (book_id, price, quantity, order_id) VALUES
                                                                   (1, 20.5, 1, 1),
                                                                   (2, 15.0, 2, 2),
                                                                   (3, 22.3, 1, 3),
                                                                   (4, 10.9, 3, 4),
                                                                   (5, 18.7, 1, 5),
                                                                   (6, 25.0, 2, 6),
                                                                   (7, 9.5, 4, 7),
                                                                   (8, 13.3, 1, 8),
                                                                   (9, 17.8, 3, 9),
                                                                   (10, 21.0, 1, 10);

INSERT INTO comments (book_id, rating, user_id, created_at, content) VALUES
                                                                         (1, 5, 2, '2025-05-01 12:00:00', 'Great book!'),
                                                                         (2, 4, 3, '2025-05-02 13:00:00', 'Interesting read.'),
                                                                         (3, 3, 4, '2025-05-03 14:00:00', 'Not bad.'),
                                                                         (4, 5, 5, '2025-05-04 15:00:00', 'Loved it.'),
                                                                         (5, 2, 6, '2025-05-05 16:00:00', 'Could be better.'),
                                                                         (6, 4, 7, '2025-05-06 17:00:00', 'Enjoyed it.'),
                                                                         (7, 5, 2, '2025-05-07 18:00:00', 'Excellent!'),
                                                                         (8, 3, 3, '2025-05-08 19:00:00', 'Okay book.'),
                                                                         (9, 4, 4, '2025-05-09 20:00:00', 'Good one.'),
                                                                         (10, 5, 10, '2025-05-10 21:00:00', 'Highly recommend.');

INSERT INTO images (book_id, link) VALUES
                                       (1, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (2, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (3, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (4, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (5, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (6, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (7, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (8, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (9, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg'),
                                       (10, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781847941831.jpg');