-- Insert sample data into the Superhero table
INSERT INTO Customer (customer_id, name, email, phone) VALUES
(10001, 'Spider-Man', 'spiderman@example.com', '123-456-7890'),
(10002, 'Wonder Woman', 'wonderwoman@example.com', '987-654-3210'),
(10003, 'Iron Man', 'ironman@example.com', '555-123-4567');

-- Insert sample data into the Product table
INSERT INTO Product (product_id, product_name, price, stock_quantity) VALUES
(20001, 'Widget A', 15.99, 100),
(20002, 'Gadget B', 25.50, 200),
(20003, 'Gizmo C', 30.00, 150);

-- Insert sample data into the Invoice table
INSERT INTO Invoice (invoice_id, customer_id, product_id, quantity, total_amount, date) VALUES
(30001, 10001, 20001, 2, 31.98, '2024-10-01'),
(30002, 10002, 20002, 1, 25.50, '2024-10-05'),
(30003, 10001, 20003, 3, 90.00, '2024-10-07'),
(30004, 10003, 20001, 1, 15.99, '2024-10-10');
