-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2024 at 07:56 AM
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
-- Database: `weddinggram`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_counter`
--

CREATE TABLE `admin_counter` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_counter`
--

INSERT INTO `admin_counter` (`id`) VALUES
(1),
(2),
(3),
(4),
(5);

-- --------------------------------------------------------

--
-- Table structure for table `customer_counter`
--

CREATE TABLE `customer_counter` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_counter`
--

INSERT INTO `customer_counter` (`id`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `kode_admin` varchar(10) NOT NULL,
  `nama_admin` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`kode_admin`, `nama_admin`, `username`, `password`) VALUES
('A-0003', 'Dadang Konelo', 'konelo', '$2b$10$oAdMXYA27Yex8hR4a8FPN.BGUp.W6094cwNd0vd3f94/vygeYqLSu'),
('A-0005', 'admin', 'admin', '$2b$10$N/1B3WaPV2QPhF/C0.rjzO8oQ5rMWOnnZjN2j.ebphRscJ9dIDGUG');

--
-- Triggers `tbl_admin`
--
DELIMITER $$
CREATE TRIGGER `before_insert_admin` BEFORE INSERT ON `tbl_admin` FOR EACH ROW BEGIN
DECLARE new_id_admin INT;
INSERT INTO admin_counter VALUES(NULL);
set new_id_admin = LAST_INSERT_ID();
SET NEW.kode_admin = CONCAT('A-',LPAD(new_id_admin,4,'0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customer`
--

CREATE TABLE `tbl_customer` (
  `kode_customer` varchar(10) NOT NULL,
  `nama_customer` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `url_profileImg` text DEFAULT 'https://res.cloudinary.com/did9dikb2/image/upload/v1717838097/WeddingGram/url_profileImg/ouswgp3a0jwofrs1qjaw.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_customer`
--

INSERT INTO `tbl_customer` (`kode_customer`, `nama_customer`, `username`, `password`, `alamat`, `email`, `no_hp`, `url_profileImg`) VALUES
('C-0005', 'Daffa Bagus', 'daffa', '$2b$10$1kErcW0IPP9Cpf2ODbUqe.0iYk4TbxYj4BERUnBspSFpdUSBrl3pi', '123 Main St', 'johndoe@example.com', '1234567890', NULL),
('C-0006', 'Muhammad Pathy', 'pati', '$2b$10$hTuLEhgMRWnfKRJ8AiH58OiBEenP0WyXg1wKt8F0TMaNtH6H1VLYa', 'Jatinegara No.5', 'pathykun@gmail.com', '085232045537', 'https://res.cloudinary.com/did9dikb2/image/upload/v1718898173/r6we4ji6oxzx4nwydesc.jpg'),
('C-0007', 'Raffi Zeinuri', 'raffizm', '$2b$10$ziFGRzBB8J0rIIDxI3UhGu6GTvFSTjUfC/o/58HaPyteqgcpG.2ua', '123 Main St', 'johndoe@example.com', '1234567890', NULL),
('C-0008', 'Ilham Kurnia', 'ilhamgeming', '$2b$10$bl7xrZ8gbqP9ukOySfszN.cB6hj3MMsnX.Dxx4YHkXgLHJuUPVPGq', 'Jakarta Street 1B', 'ilham223@gmail.com', '084314142134', NULL),
('C-0009', 'Muhammad Syafa Surya Kusumah', 'suryask', '$2b$10$f6aRecSzTkEBeF7Ucgv1L.qm/B7VViyLA5OFJVXE4THxgoLWZYOsi', 'Jl. Golf No 8', 'sapsur3gp@gmail.com', '08976314445', 'https://res.cloudinary.com/did9dikb2/image/upload/v1717838097/WeddingGram/url_profileImg/ouswgp3a0jwofrs1qjaw.jpg'),
('C-0010', 'Luqman Kurnia Sandy', 'luqmansandy', '$2b$10$tkwbYpHkMSVve9RJ83kVTeVW5la9P4RE9dvtkLkZL22PXtdVu7cgW', 'Jombang', 'sandyluqmankurnia@gmail.com', '085646165400', 'https://res.cloudinary.com/did9dikb2/image/upload/v1719052210/nrtlvvutjlnadnjcxjfi.jpg'),
('C-0011', 'Luqman Kurnia Sandy', 'luqmansandy1', '$2b$10$Ja8Z/w2BfUb5yboICZz1meZn7ziyh7t0RchVfQln2iriLBTHECXEO', 'Jombang', 'sandyluqmankurnia@gmail.com', '085646165400', 'https://res.cloudinary.com/did9dikb2/image/upload/v1717838097/WeddingGram/url_profileImg/ouswgp3a0jwofrs1qjaw.jpg'),
('C-0012', 'Luqman Kurnia Sandy', 'luqmankurniasandy', '$2b$10$XmI81USVcdQDPvHIs7n5SuvNPntYDzJsXx.TAA7tF/4OdJ9IQcDmi', 'Jl. Telang Indah Gg.V No.H-34', 'sandyluqmankurnia@gmail.com', '085646165400', 'https://res.cloudinary.com/did9dikb2/image/upload/v1719285631/jqu9jqsvaniiwcbdqe2f.jpg');

--
-- Triggers `tbl_customer`
--
DELIMITER $$
CREATE TRIGGER `before_insert_customer` BEFORE INSERT ON `tbl_customer` FOR EACH ROW BEGIN
DECLARE new_id INT;
INSERT INTO customer_counter VALUES(NULL);
SET new_id = LAST_INSERT_ID();
SET NEW.kode_customer = CONCAT('C-', LPAD(new_id,4,'0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `kode_order` varchar(10) NOT NULL,
  `kode_product` varchar(10) NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `kode_pembayaran` varchar(20) NOT NULL,
  `tanggal_acara` date NOT NULL,
  `tanggal_order` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_biaya` int(10) NOT NULL,
  `status_order` enum('Menunggu Pembayaran','Di Proses','Selesai') NOT NULL DEFAULT 'Menunggu Pembayaran'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`kode_order`, `kode_product`, `kode_customer`, `kode_pembayaran`, `tanggal_acara`, `tanggal_order`, `total_biaya`, `status_order`) VALUES
('ORD6zdowy0', 'P-0002', 'C-0012', 'PBhf8ha1vbn', '2024-07-04', '2024-06-24 17:00:00', 5000000, 'Selesai'),
('ORD914n38w', 'P-0001', 'C-0010', 'PB5qt8j6ypk', '2024-06-30', '2024-06-19 17:00:00', 4000000, 'Selesai'),
('ORDmqdpkjc', 'P-0001', 'C-0006', 'PBam3we259s', '2024-05-30', '2024-06-06 17:00:00', 4000000, 'Selesai'),
('ORDnxjike7', 'P-0002', 'C-0012', 'PBq959xos7z', '2024-07-04', '2024-06-24 17:00:00', 5000000, 'Selesai');

--
-- Triggers `tbl_order`
--
DELIMITER $$
CREATE TRIGGER `before_insert_order` BEFORE INSERT ON `tbl_order` FOR EACH ROW BEGIN
set NEW.tanggal_order = CURDATE();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pembayaran`
--

CREATE TABLE `tbl_pembayaran` (
  `kode_pembayaran` varchar(20) NOT NULL,
  `kode_customer` varchar(10) DEFAULT NULL,
  `metode_pembayaran` enum('COD','Transfer') DEFAULT NULL,
  `status_pembayaran` enum('Pengecekan oleh Admin','Terbayar') DEFAULT NULL,
  `bukti_transfer` text DEFAULT NULL,
  `kode_admin` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pembayaran`
--

INSERT INTO `tbl_pembayaran` (`kode_pembayaran`, `kode_customer`, `metode_pembayaran`, `status_pembayaran`, `bukti_transfer`, `kode_admin`) VALUES
('PB5qt8j6ypk', 'C-0010', 'Transfer', 'Terbayar', 'https://res.cloudinary.com/did9dikb2/image/upload/v1718890054/WeddingGram/bukti_transfer/1718890052117-React-App.png.jpg', 'A-0003'),
('PBam3we259s', 'C-0006', 'Transfer', 'Terbayar', 'https://res.cloudinary.com/did9dikb2/image/upload/v1717749950/WeddingGram/bukti_transfer/1717749948258-Pengerjaan%206%20Juni%202023.png.jpg', 'A-0003'),
('PBhf8ha1vbn', 'C-0012', 'Transfer', 'Terbayar', 'https://res.cloudinary.com/did9dikb2/image/upload/v1719286064/WeddingGram/bukti_transfer/1719286060225-Bukti%20Pembayaran.jpg.jpg', 'A-0005'),
('PBq959xos7z', 'C-0012', 'Transfer', 'Terbayar', 'https://res.cloudinary.com/did9dikb2/image/upload/v1719286165/WeddingGram/bukti_transfer/1719286163810-Bukti%20Pembayaran.jpg.jpg', 'A-0005');

--
-- Triggers `tbl_pembayaran`
--
DELIMITER $$
CREATE TRIGGER `update_order_status` AFTER UPDATE ON `tbl_pembayaran` FOR EACH ROW BEGIN
IF NEW.status_pembayaran = "Terbayar" THEN
UPDATE tbl_order
SET status_order = "Di Proses"
WHERE kode_pembayaran = NEW.kode_pembayaran;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `kode_product` varchar(10) NOT NULL,
  `nama_product` varchar(100) NOT NULL,
  `price` int(15) NOT NULL COMMENT 'Start From :',
  `qty_fotografer` int(5) NOT NULL,
  `qty_videografer` int(5) NOT NULL,
  `qty_crew` int(5) NOT NULL,
  `work_hour` int(5) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`kode_product`, `nama_product`, `price`, `qty_fotografer`, `qty_videografer`, `qty_crew`, `work_hour`, `description`) VALUES
('P-0001', 'Jasa Paket Wedding FAVORITE', 3500000, 1, 1, 0, 12, 'Jasa Paket Wedding FAVORITE\n\nRp. 4.097.000 – Rp. 3.589.000\n\n1 Fotografer\n1 Videografer\nMaks 12 Jam Kerja\nDVD File Master Foto High Resolution (Softcopy Semua File)\nDVD File Video Edit Full Acara (HD)\n1 Album Kolase 20×30 (20 Halaman)\n( Bonus 1 Foto Cetak 60×40 cm + Bingkai Minimalis )\n'),
('P-0002', 'Jasa Paket Wedding EXCLUSIVE\r\n', 4450000, 2, 1, 1, 12, 'Jasa Paket Wedding EXCLUSIVE\r\n\r\nRp. 5.097.000 – Rp. 4.449.000\r\n\r\n2 Fotografer\r\n1 Videografer\r\n1 Crew\r\nMaks 12 Jam Kerja\r\nSet Studio Mini di Lokasi Wedding\r\nDVD File Master Foto High Resolution (Softcopy Semua File)\r\nDVD File Video Edit Full Acara (HD)\r\n1 Album Kolase 20×30 (20 Halaman)\r\n( Bonus 1 Foto Cetak 40×60 cm + Bingkai Minimalis )\r\n'),
('P-0003', 'Jasa Paket Wedding GLAMOUR\r\n', 5600000, 2, 2, 1, 15, 'Jasa Paket Wedding GLAMOUR\r\n\r\nRp. 6.097.000 – Rp. 5.559.000\r\n\r\n2 Fotografer dan 2 Videografer (1 Crew)\r\nSet Studio Mini di Lokasi Wedding\r\nDVD File Master Foto High Resolution\r\nDVD File Video Edit Full Acara (HD)\r\n1 Album Kolase 20×30 (20 Halaman)\r\n( Bonus 2 Foto Cetak 12R + Bingkai )\r\n'),
('P-0004', 'Jasa Paket Wedding GOLD (CINEMATIC WEDDING CLIP dan AERIAL PHOTOGRAPHY)\r\n', 8800000, 2, 2, 1, 15, 'Jasa Paket Wedding GOLD (CINEMATIC WEDDING CLIP dan AERIAL PHOTOGRAPHY)\r\n\r\nRp. 9.097.000 – Rp. 8.799.000\r\n\r\n2 Fotografer dan 2 Videografer (1 Crew)\r\nGratis Prewedding Studio\r\nSet Studio Mini di Lokasi Wedding\r\nCinematic Video Highlight\r\nDVD File Master Foto High Resolution\r\nDVD File Video Edit Full Acara (HD)\r\n1 Album Kolase 20×30 (20 Halaman)\r\n( Bonus 2 Foto Cetak 40×60 cm + Bingkai Minimalis )');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_counter`
--
ALTER TABLE `admin_counter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_counter`
--
ALTER TABLE `customer_counter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`kode_admin`);

--
-- Indexes for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  ADD PRIMARY KEY (`kode_customer`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD PRIMARY KEY (`kode_order`),
  ADD KEY `kode_pembayaran` (`kode_pembayaran`),
  ADD KEY `kode_customer` (`kode_customer`),
  ADD KEY `fk_order_product` (`kode_product`);

--
-- Indexes for table `tbl_pembayaran`
--
ALTER TABLE `tbl_pembayaran`
  ADD PRIMARY KEY (`kode_pembayaran`),
  ADD KEY `kode_customer` (`kode_customer`),
  ADD KEY `kode_admin` (`kode_admin`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`kode_product`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_counter`
--
ALTER TABLE `admin_counter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer_counter`
--
ALTER TABLE `customer_counter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD CONSTRAINT `fk_order_product` FOREIGN KEY (`kode_product`) REFERENCES `tbl_product` (`kode_product`),
  ADD CONSTRAINT `tbl_order_ibfk_2` FOREIGN KEY (`kode_pembayaran`) REFERENCES `tbl_pembayaran` (`kode_pembayaran`),
  ADD CONSTRAINT `tbl_order_ibfk_3` FOREIGN KEY (`kode_customer`) REFERENCES `tbl_customer` (`kode_customer`),
  ADD CONSTRAINT `tbl_order_ibfk_4` FOREIGN KEY (`kode_product`) REFERENCES `tbl_product` (`kode_product`);

--
-- Constraints for table `tbl_pembayaran`
--
ALTER TABLE `tbl_pembayaran`
  ADD CONSTRAINT `tbl_pembayaran_ibfk_1` FOREIGN KEY (`kode_customer`) REFERENCES `tbl_customer` (`kode_customer`),
  ADD CONSTRAINT `tbl_pembayaran_ibfk_2` FOREIGN KEY (`kode_admin`) REFERENCES `tbl_admin` (`kode_admin`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
