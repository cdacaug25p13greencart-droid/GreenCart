CREATE DATABASE  IF NOT EXISTS `greencartdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `greencartdb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: greencartdb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `area_id` int NOT NULL AUTO_INCREMENT,
  `area_name` varchar(50) NOT NULL,
  `pincode` int NOT NULL,
  `city_id` int NOT NULL,
  PRIMARY KEY (`area_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `areas_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Baner',411045,1),(2,'Gangapur',422013,2);
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Rice'),(2,'Wheat'),(3,'Pulses'),(4,'Oilseeds'),(5,'Spices');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(50) NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Pune'),(2,'Nashik');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,85.00,2,170.00),(2,1,2,45.00,1,45.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `buyer_id` int NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `buyer_id` (`buyer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,4,'2026-01-20 10:42:15',230.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `payment_method` enum('COD') DEFAULT 'COD',
  `payment_status` enum('SUCCESS','PENDING') DEFAULT 'PENDING',
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'COD','SUCCESS');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `pname` varchar(100) NOT NULL,
  `sub_category_id` int NOT NULL,
  `description` text,
  PRIMARY KEY (`pid`),
  KEY `sub_category_id` (`sub_category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`sub_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Premium Basmati Rice',1,'Long grain basmati rice'),(2,'Organic Wheat',10,'Chemical free wheat'),(3,'Toor Dal',12,'High protein pulse'),(4,'Groundnut Seeds',16,'Oil rich groundnut'),(5,'Turmeric Powder',21,'Pure turmeric');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_stock`
--

DROP TABLE IF EXISTS `products_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_stock` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `seller_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`stock_id`),
  KEY `product_id` (`product_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `products_stock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`pid`),
  CONSTRAINT `products_stock_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_stock`
--

LOCK TABLES `products_stock` WRITE;
/*!40000 ALTER TABLE `products_stock` DISABLE KEYS */;
INSERT INTO `products_stock` VALUES (1,1,2,85.00,500,'2026-01-20 10:42:15'),(2,2,2,45.00,700,'2026-01-20 10:42:15'),(3,3,3,110.00,300,'2026-01-20 10:42:15'),(4,4,3,90.00,400,'2026-01-20 10:42:15'),(5,5,2,180.00,200,'2026-01-20 10:42:15');
/*!40000 ALTER TABLE `products_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) NOT NULL,
  `role_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN','System Administrator'),(2,'FARMER','Farmer / Seller'),(3,'BUYER','Customer / Buyer');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security_questions`
--

DROP TABLE IF EXISTS `security_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security_questions` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security_questions`
--

LOCK TABLES `security_questions` WRITE;
/*!40000 ALTER TABLE `security_questions` DISABLE KEYS */;
INSERT INTO `security_questions` VALUES (1,'Your village name?'),(2,'Your first crop?'),(3,'Your favourite color?'),(4,'Your mother name?'),(5,'Your pet name?');
/*!40000 ALTER TABLE `security_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categories` (
  `sub_category_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `sub_category_name` varchar(100) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  PRIMARY KEY (`sub_category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (1,1,'Basmati Rice','ACTIVE'),(2,1,'Non-Basmati Rice','ACTIVE'),(3,1,'Brown Rice','ACTIVE'),(4,1,'Parboiled Rice','ACTIVE'),(5,1,'Broken Rice','ACTIVE'),(6,2,'Durum Wheat','ACTIVE'),(7,2,'Hard Wheat','ACTIVE'),(8,2,'Soft Wheat','ACTIVE'),(9,2,'Whole Wheat','ACTIVE'),(10,2,'Organic Wheat','ACTIVE'),(11,3,'Chickpea (Chana)','ACTIVE'),(12,3,'Pigeon Pea (Toor Dal)','ACTIVE'),(13,3,'Green Gram (Moong)','ACTIVE'),(14,3,'Black Gram (Urad)','ACTIVE'),(15,3,'Lentils (Masoor)','ACTIVE'),(16,4,'Groundnut','ACTIVE'),(17,4,'Soybean','ACTIVE'),(18,4,'Mustard Seeds','ACTIVE'),(19,4,'Sunflower Seeds','ACTIVE'),(20,4,'Sesame (Til)','ACTIVE'),(21,5,'Turmeric','ACTIVE'),(22,5,'Dry Chilli','ACTIVE'),(23,5,'Coriander Seeds','ACTIVE'),(24,5,'Cumin Seeds','ACTIVE'),(25,5,'Pepper','ACTIVE');
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `role_id` int NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `status` int NOT NULL,
  `question_id` int DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `aadhaar_no` varchar(12) DEFAULT NULL,
  `area_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  KEY `question_id` (`question_id`),
  KEY `fk_users_area` (`area_id`),
  CONSTRAINT `fk_users_area` FOREIGN KEY (`area_id`) REFERENCES `areas` (`area_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`question_id`) REFERENCES `security_questions` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin12345','System','Admin',1,'admin@farm.com','900000001',1,1,'PUNE','2026-01-20 10:42:15',NULL,NULL),(2,'farmer1','farm12345','Ramesh','Patil',2,'farmer1@farm.com','900000002',1,2,'RICE','2026-01-20 10:42:15',NULL,NULL),(3,'farmer2','newPass123','Suresh','Jadhav',2,'farmer2@farm.com','900000003',2,1,'NASHIK','2026-01-20 10:42:15',NULL,NULL),(4,'buyer1','buyer1','Amit','Sharma',3,'buyer1@farm.com','900000004',2,2,'WHEAT','2026-01-20 10:42:15',NULL,NULL),(5,'shubham123','pass@123','Shubham','Ranmale',2,'shubham@gmail.com','9876543210',1,1,'Blue','2026-01-20 17:03:08',NULL,NULL),(6,'max123','pass@123','max','pol',2,'max@gmail.com','9876543210',1,1,'red','2026-01-20 17:15:06',NULL,NULL),(8,'sam','123','Shubham','Ranmale',2,'shubhamranmale4243@gmail.com','07709203702',1,NULL,'pune','2026-01-21 12:38:00','123456789102',NULL),(9,'anurag123','1234','Anurag','Yadav',3,'anurag@gmail.com','1234567891',2,NULL,'Satara','2026-01-22 04:57:10',NULL,NULL),(11,'max','123','max','roy',2,'maxroy@gmail.com','1478523690',1,NULL,'Satara','2026-01-22 06:13:32','123456789123',NULL),(12,'tejas','111','tejas','tarole',2,'tejas@gmail.com','7894561230',1,NULL,'akola','2026-01-22 06:20:31','123654789147',NULL),(14,'amit','123','amit','patil',2,'amit@gmail.com','9632587410',1,NULL,'Dal','2026-01-22 06:57:54','123458523692',NULL),(15,'amruta','123','amruta','patil',2,'amruta@gmail.com','9632123450',1,NULL,'moshi','2026-01-22 07:00:35','123458523600',NULL),(16,'omkar25','omkar25','omkar','maharnor',2,'omkar@gmail.com','12245522',1,NULL,'black','2026-01-22 07:32:15','123456789101',NULL),(17,'sujit1','sujit1','sujit','wandre',2,'sujit@gmail.com','1098765432',1,NULL,'pune','2026-01-22 07:55:09','525252525252',NULL),(18,'digu','digu','digu','kapurkar',2,'digu@gmail.com','1234567890',1,1,'pune','2026-01-22 08:05:36','555555555555',NULL),(19,'sachin','sachin1234','sachin','lokhande',2,'sachin@gmail.com','8888888888',1,3,'black','2026-01-22 08:11:06','777777777777',NULL),(23,'shreya','shreya123','Shubham','Ranmale',3,'shreya4243@gmail.com','7709203702',2,1,'sangali','2026-01-22 18:46:25',NULL,1),(24,'omkar','omkar123','omkar','patil',2,'om@gmail.com','7895412580',1,3,'red','2026-01-22 18:51:56','123856789012',2),(25,'harsh','harsh123','harsh','pol',3,'harsh@gmail.com','7896547896',2,3,'red','2026-01-22 18:55:59',NULL,1),(27,'abcde','abcde12345','abcde','abcde',3,'abcd@gmail.com','7709203702',2,3,'red','2026-01-23 04:40:54',NULL,1),(28,'soham','soham1234','soham','pol',3,'soham@gmail.com','9478523695',1,3,'blue','2026-01-23 06:08:02',NULL,2),(29,'sainath','sainath123','sainath','patil',2,'sainath@gmail.com','9632587410',2,3,'blue','2026-01-23 06:09:25','147825893698',1),(30,'rohit','rohit123','rohit','patil',3,'rohit@gmail.com','8965741236',1,3,'black','2026-01-23 06:15:52',NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-23 15:40:43
