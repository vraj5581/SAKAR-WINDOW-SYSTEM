-- Sakar Window System Database Schema

CREATE DATABASE IF NOT EXISTS sakar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sakar_db;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    tag VARCHAR(50) NOT NULL, -- e.g., Sliding, Casement, Slimline, Folding
    description TEXT NOT NULL,
    profile_width VARCHAR(100) NOT NULL,
    glazing_thickness VARCHAR(100) NOT NULL,
    acoustic_rating VARCHAR(100) NOT NULL,
    water_tightness VARCHAR(100) NOT NULL, -- also maps to wind load class
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
