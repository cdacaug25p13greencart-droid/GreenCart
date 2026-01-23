create database greencartdb;
use greencart;
/* =====================================================
   LOCATION TABLES
   ===================================================== */

CREATE TABLE cities (
    city_id INT PRIMARY KEY AUTO_INCREMENT,
    city_name VARCHAR(50) NOT NULL
);

CREATE TABLE areas (
    area_id INT PRIMARY KEY AUTO_INCREMENT,
    area_name VARCHAR(50) NOT NULL,
    pincode INT NOT NULL,
    city_id INT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

/* =====================================================
   ROLE & SECURITY
   ===================================================== */

CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(20) NOT NULL,
    role_description VARCHAR(255)
);

CREATE TABLE security_questions (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(255) NOT NULL
);

/* =====================================================
   USERS
   ===================================================== */

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    area_id INT,
    status ENUM('PENDING','ACTIVE','SUSPENDED') DEFAULT 'ACTIVE',
    question_id INT,
    answer VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (area_id) REFERENCES areas(area_id),
    FOREIGN KEY (question_id) REFERENCES security_questions(question_id)
);

/* =====================================================
   CATEGORY & SUB CATEGORY
   ===================================================== */

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE sub_categories (
    sub_category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    sub_category_name VARCHAR(100) NOT NULL,
    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

/* =====================================================
   PRODUCTS
   ===================================================== */

CREATE TABLE products (
    pid INT PRIMARY KEY AUTO_INCREMENT,
    pname VARCHAR(100) NOT NULL,
    sub_category_id INT NOT NULL,
    description TEXT,
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(sub_category_id)
);

CREATE TABLE products_stock (
    stock_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    seller_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(pid),
    FOREIGN KEY (seller_id) REFERENCES users(user_id)
);

/* =====================================================
   ORDERS & PAYMENTS
   ===================================================== */

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    buyer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (buyer_id) REFERENCES users(user_id)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    unit_price DECIMAL(10,2),
    quantity INT,
    total_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(pid)
);

CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_method ENUM('COD') DEFAULT 'COD',
    payment_status ENUM('SUCCESS','PENDING') DEFAULT 'PENDING',
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

/* =====================================================
   INSERT MASTER DATA
   ===================================================== */

INSERT INTO cities (city_name) VALUES ('Pune'),('Nashik');
INSERT INTO areas (area_name,pincode,city_id)
VALUES ('Baner',411045,1),('Gangapur',422013,2);

INSERT INTO roles (role_name,role_description)
VALUES
('ADMIN','System Administrator'),
('FARMER','Farmer / Seller'),
('BUYER','Customer / Buyer');

INSERT INTO security_questions (question)
VALUES ('Your village name?'),('Your first crop?');

/* =====================================================
   USERS
   ===================================================== */

INSERT INTO users
(username,password,first_name,last_name,role_id,email,phone,area_id,question_id,answer)
VALUES
('admin','admin123','System','Admin',1,'admin@farm.com','900000001',1,1,'PUNE'),
('farmer1','farm123','Ramesh','Patil',2,'farmer1@farm.com','900000002',2,2,'RICE'),
('farmer2','farm123','Suresh','Jadhav',2,'farmer2@farm.com','900000003',2,1,'NASHIK'),
('buyer1','buy123','Amit','Sharma',3,'buyer1@farm.com','900000004',1,2,'WHEAT');

/* =====================================================
   CATEGORIES
   ===================================================== */

INSERT INTO categories (category_name)
VALUES ('Rice'),('Wheat'),('Pulses'),('Oilseeds'),('Spices');

/* =====================================================
   SUB-CATEGORIES (AS GIVEN)
   ===================================================== */

INSERT INTO sub_categories (category_id,sub_category_name) VALUES
-- Rice
(1,'Basmati Rice'),(1,'Non-Basmati Rice'),(1,'Brown Rice'),
(1,'Parboiled Rice'),(1,'Broken Rice'),

-- Wheat
(2,'Durum Wheat'),(2,'Hard Wheat'),(2,'Soft Wheat'),
(2,'Whole Wheat'),(2,'Organic Wheat'),

-- Pulses
(3,'Chickpea (Chana)'),(3,'Pigeon Pea (Toor Dal)'),
(3,'Green Gram (Moong)'),(3,'Black Gram (Urad)'),
(3,'Lentils (Masoor)'),

-- Oilseeds
(4,'Groundnut'),(4,'Soybean'),(4,'Mustard Seeds'),
(4,'Sunflower Seeds'),(4,'Sesame (Til)'),

-- Spices
(5,'Turmeric'),(5,'Dry Chilli'),
(5,'Coriander Seeds'),(5,'Cumin Seeds'),(5,'Pepper');

/* =====================================================
   PRODUCTS
   ===================================================== */

INSERT INTO products (pname,sub_category_id,description) VALUES
('Premium Basmati Rice',1,'Long grain basmati rice'),
('Organic Wheat',10,'Chemical free wheat'),
('Toor Dal',12,'High protein pulse'),
('Groundnut Seeds',16,'Oil rich groundnut'),
('Turmeric Powder',21,'Pure turmeric');

/* =====================================================
   PRODUCT STOCK (FARMERS)
   ===================================================== */

INSERT INTO products_stock (product_id,seller_id,price,quantity) VALUES
(1,2,85,500),
(2,2,45,700),
(3,3,110,300),
(4,3,90,400),
(5,2,180,200);

/* =====================================================
   ORDERS, ITEMS & PAYMENTS (COD)
   ===================================================== */

INSERT INTO orders (buyer_id,total_amount) VALUES (4,230);

INSERT INTO order_items (order_id,product_id,unit_price,quantity,total_price)
VALUES (1,1,85,2,170),(1,2,45,1,45);

INSERT INTO payments (order_id,payment_method,payment_status)
VALUES (1,'COD','SUCCESS');
