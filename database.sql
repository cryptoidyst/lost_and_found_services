CREATE DATABASE  IF NOT EXISTS `db_aa6062_lafapp` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_aa6062_lafapp`;
-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: MYSQL9001.site4now.net    Database: db_aa6062_lafapp
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
-- Table structure for table `claim`
--

DROP TABLE IF EXISTS `claim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `report_id` int NOT NULL,
  `claimer_id` int NOT NULL,
  `claimed_date` datetime DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_637cd83025645244f21b2621cfc` (`report_id`),
  KEY `FK_0be3449a5b23fb27ca6eb854b68` (`claimer_id`),
  CONSTRAINT `FK_0be3449a5b23fb27ca6eb854b68` FOREIGN KEY (`claimer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_637cd83025645244f21b2621cfc` FOREIGN KEY (`report_id`) REFERENCES `report` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claim`
--

LOCK TABLES `claim` WRITE;
/*!40000 ALTER TABLE `claim` DISABLE KEYS */;
/*!40000 ALTER TABLE `claim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `sent_date` datetime NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `receiver_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `conversation_no` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_757ab277b805a658557550486ab` (`sender_id`),
  KEY `FK_59905d5b64f7201f1cbaa16bba5` (`receiver_id`),
  CONSTRAINT `FK_59905d5b64f7201f1cbaa16bba5` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_757ab277b805a658557550486ab` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'Hello, how are you 111?','2024-06-08 02:04:53','2024-06-07 11:04:53.294809','2024-06-07 11:04:53.294809',32,30,'e4bea785-2f33-4868-aa2a-c41745ecd809'),(2,'Hello, how are you 222?','2024-06-08 02:04:57','2024-06-07 11:04:57.897047','2024-06-07 11:04:57.897047',32,30,'e4bea785-2f33-4868-aa2a-c41745ecd809'),(3,'Hello, how are you 333?','2024-06-08 02:05:02','2024-06-07 11:05:02.840428','2024-06-07 11:05:02.840428',32,30,'e4bea785-2f33-4868-aa2a-c41745ecd809'),(4,'Hello, how are you 333?','2024-06-08 02:05:08','2024-06-07 11:05:08.855092','2024-06-07 11:05:08.855092',30,32,'e4bea785-2f33-4868-aa2a-c41745ecd809'),(5,'Hello, how are you 111?','2024-06-08 02:05:14','2024-06-07 11:05:15.000280','2024-06-07 11:05:15.000280',30,32,'e4bea785-2f33-4868-aa2a-c41745ecd809'),(7,'Hello, how are you 111?','2024-06-08 02:05:24','2024-06-07 11:05:24.723129','2024-06-07 11:05:24.723129',31,32,'b6f6afe9-773b-4c15-be18-a6c1c0d91e04'),(8,'asdasd','2024-06-08 02:50:07','2024-06-07 11:50:07.331046','2024-06-07 11:50:07.331046',32,30,'e4bea785-2f33-4868-aa2a-c41745ecd809'),(9,'aasdsad','2024-06-08 02:50:28','2024-06-07 11:50:28.966987','2024-06-07 11:50:28.966987',30,32,'e4bea785-2f33-4868-aa2a-c41745ecd809');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int NOT NULL,
  `item_name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `item_description` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `report_date` datetime DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `report_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c6686efa4cd49fa9a429f01bac8` (`user_id`),
  CONSTRAINT `FK_c6686efa4cd49fa9a429f01bac8` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_image`
--

DROP TABLE IF EXISTS `report_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `report_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `image` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d023336a84c376fddf920b2e9e0` (`report_id`),
  CONSTRAINT `FK_d023336a84c376fddf920b2e9e0` FOREIGN KEY (`report_id`) REFERENCES `report` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_image`
--

LOCK TABLES `report_image` WRITE;
/*!40000 ALTER TABLE `report_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (30,'cassie2','$2b$10$onH7auuH5RV1mYSVR3so4.HffryBRu3rGXJZ695gGx4Nee3I0uG2S','cassie2@gmail.com',NULL,'Cassie Chang','KL','84_1717684087219.jpg','2024-06-06 06:40:13.417582','2024-06-06 07:28:07.000000'),(31,'dickson','$2b$10$5nV/.IUSitkfVth.Qedok.6JCJpgxcXyqdDizAZO9r7r3PKPYvgG2','dickson@gmail.com',NULL,'dickson','kl','dinasour_1717681710652.jpg','2024-06-06 06:46:26.188001','2024-06-06 06:48:30.000000'),(32,'jessie123','$2b$10$WMr7euXKYh6STGqTFzRNmOc6WryKB4aus6jQXIXSFJGar3Yy98tau','jessie@gmail.com',NULL,'Jessie Chong','KL','72_1717683297554.jpeg','2024-06-06 07:12:16.957006','2024-06-06 07:14:57.000000');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-20 18:26:10
