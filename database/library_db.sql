-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2026 at 04:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `author` varchar(150) NOT NULL,
  `isbn` varchar(20) NOT NULL,
  `category` varchar(80) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `available` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `isbn`, `category`, `quantity`, `available`, `created_at`) VALUES
(4, 'JavaScript Basics', 'Bugzappercode (Tumaini)', '9781234567890', 'Technology', 12, 11, '2026-05-22 08:16:03'),
(7, 'backend ', 'mc dassan pro senior', '678', 'vol1', 20, 20, '2026-05-22 09:21:18');

-- --------------------------------------------------------

--
-- Table structure for table `borrowings`
--

CREATE TABLE `borrowings` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `borrower_name` varchar(150) NOT NULL,
  `borrower_phone` varchar(20) NOT NULL,
  `borrow_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status` enum('borrowed','returned') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowings`
--

INSERT INTO `borrowings` (`id`, `book_id`, `borrower_name`, `borrower_phone`, `borrow_date`, `return_date`, `status`) VALUES
(2, 7, 'teacher antoinete', '0694847494', '2026-05-10', '2026-05-22', 'returned'),
(4, 4, 'diane', '05847638', '2026-05-12', '2026-05-22', 'returned');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `borrowings_ibfk_1` (`book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `borrowings`
--
ALTER TABLE `borrowings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD CONSTRAINT `borrowings_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
