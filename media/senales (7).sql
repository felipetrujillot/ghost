-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 16, 2025 at 12:16 PM
-- Server version: 9.1.0
-- PHP Version: 8.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `senales`
--

-- --------------------------------------------------------

--
-- Table structure for table `amigos`
--

CREATE TABLE `amigos` (
  `id_amigo` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_usuario_amigo` int NOT NULL,
  `estado` enum('pendiente','aceptado','bloqueado','') COLLATE utf8mb4_spanish2_ci NOT NULL DEFAULT 'pendiente',
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `amigos`
--

INSERT INTO `amigos` (`id_amigo`, `id_usuario`, `id_usuario_amigo`, `estado`, `activo`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'pendiente', 1, '2025-01-08 00:54:03', NULL),
(2, 1, 98, 'pendiente', 1, '2025-01-08 00:54:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `empresas`
--

CREATE TABLE `empresas` (
  `id_empresa` int NOT NULL,
  `nombre_empresa` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `logo_empresa` varchar(500) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_ano_academico` int NOT NULL,
  `id_periodo_academico` int NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `empresas`
--

INSERT INTO `empresas` (`id_empresa`, `nombre_empresa`, `logo_empresa`, `id_ano_academico`, `id_periodo_academico`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Señales de tránsito', '', 0, 0, 1, '2024-05-24 21:44:04', '2025-02-08 21:19:38');

-- --------------------------------------------------------

--
-- Table structure for table `passwords_reset`
--

CREATE TABLE `passwords_reset` (
  `id_password_reset` int NOT NULL,
  `id_user` int NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `passwords_reset`
--

INSERT INTO `passwords_reset` (`id_password_reset`, `id_user`, `token`, `active`, `created_at`, `updated_at`) VALUES
(1, 57, '42106817707', 0, '2024-02-03 00:36:12', '2024-02-03 00:36:29'),
(2, 57, '315614222875', 0, '2024-02-03 13:04:15', '2024-02-03 13:04:32'),
(3, 57, '184280947053', 1, '2024-02-20 14:18:22', NULL),
(4, 67, '737291113501', 0, '2024-02-24 21:59:04', '2024-02-24 21:59:33'),
(5, 57, '806849252594', 0, '2024-03-08 01:40:49', '2024-03-08 01:41:06'),
(6, 75, '150059104650', 0, '2024-03-14 21:42:50', '2024-03-14 21:44:20'),
(7, 76, '138001020337', 0, '2024-03-31 15:13:13', '2024-03-31 15:35:40'),
(8, 76, '888123778672', 0, '2024-04-02 20:54:00', '2024-04-02 20:55:16'),
(9, 67, '971437054429', 0, '2024-04-09 02:05:05', '2024-04-09 02:05:48'),
(10, 67, '905600899904', 0, '2024-04-24 17:53:47', '2024-04-24 17:54:32'),
(11, 67, '710895857041', 0, '2024-05-11 22:16:14', '2024-05-11 22:16:58'),
(12, 107, '475321026866', 0, '2024-07-24 02:03:40', '2024-07-24 02:03:55'),
(13, 112, '833628711696', 0, '2024-07-24 03:36:54', '2024-07-24 03:39:16'),
(14, 113, '333098556945', 0, '2024-07-24 03:41:23', '2024-07-24 03:41:50'),
(15, 113, '435888591252', 1, '2024-07-24 13:31:53', NULL),
(16, 107, '807846511740', 0, '2024-07-24 13:32:54', '2024-07-24 13:33:07'),
(17, 101, '535889796184', 1, '2024-07-24 14:43:41', NULL),
(18, 112, '171030847473', 0, '2024-07-24 14:44:13', '2024-07-24 14:48:15'),
(19, 107, '377728139796', 1, '2024-07-30 21:44:58', NULL),
(20, 112, '244943511594', 1, '2024-07-31 16:36:30', NULL),
(21, 112, '446220666954', 1, '2024-07-31 16:41:25', NULL),
(22, 112, '306422107369', 0, '2024-07-31 16:44:49', '2024-07-31 16:45:01'),
(23, 110, '870709957380', 0, '2024-08-08 15:43:35', '2024-08-08 15:44:23'),
(24, 119, '491865586022', 0, '2024-08-13 22:35:23', '2024-08-13 22:35:36'),
(25, 120, '435848018596', 0, '2024-08-13 22:36:47', '2024-08-13 22:37:02'),
(26, 121, '777132220598', 1, '2024-09-13 14:47:17', NULL),
(27, 122, '291342964863', 1, '2024-09-26 13:45:27', NULL),
(28, 123, '270288553143', 1, '2024-09-26 18:24:34', NULL),
(29, 101, '717317325302', 0, '2024-10-29 15:10:26', '2024-10-29 15:13:33'),
(30, 124, '235449153910', 1, '2024-10-29 17:48:40', NULL),
(31, 125, '352941440498', 0, '2024-11-05 18:08:50', '2025-01-09 18:26:13'),
(32, 126, '631269205021', 0, '2024-11-06 14:46:56', '2024-11-06 14:49:04'),
(33, 127, '699353236799', 1, '2024-11-08 03:50:25', NULL),
(34, 125, '916138586583', 0, '2024-12-04 15:15:39', '2025-01-09 18:27:28'),
(35, 128, '257574337814', 1, '2024-12-06 18:42:15', NULL),
(36, 129, '190710008067', 1, '2024-12-06 18:43:02', NULL),
(37, 130, '251474985853', 1, '2024-12-06 18:55:24', NULL),
(38, 131, '1330285522', 0, '2024-12-26 16:46:34', '2024-12-26 16:47:14'),
(39, 132, '306373174803', 0, '2024-12-26 16:55:22', '2024-12-26 16:57:13'),
(40, 133, '575470957636', 0, '2024-12-26 17:02:07', '2024-12-26 17:54:14'),
(41, 134, '489499855483', 0, '2024-12-26 17:56:32', '2024-12-26 17:57:04'),
(42, 134, '260462587627', 0, '2024-12-26 17:57:27', '2024-12-26 17:58:03'),
(43, 135, '996623368430', 0, '2024-12-27 17:00:21', '2024-12-27 17:01:20'),
(44, 136, '430379771143', 0, '2024-12-27 17:09:39', '2024-12-27 17:12:13'),
(45, 137, '871451450860', 1, '2024-12-27 17:29:09', NULL),
(46, 135, '812993379664', 0, '2024-12-28 02:01:53', '2024-12-28 02:02:38'),
(47, 138, '438230432652', 0, '2024-12-28 23:20:45', '2024-12-28 23:21:21'),
(48, 139, '446054150395', 0, '2024-12-28 23:28:35', '2024-12-28 23:30:23'),
(49, 140, '735183469640', 0, '2024-12-30 16:41:23', '2024-12-30 16:44:43'),
(50, 141, '677409938054', 1, '2024-12-30 16:43:45', NULL),
(51, 142, '355793319958', 0, '2024-12-30 16:53:24', '2024-12-30 16:55:08'),
(52, 143, '979056327928', 0, '2025-01-02 16:07:02', '2025-01-02 16:24:38'),
(53, 144, '462672496574', 0, '2025-01-02 16:07:35', '2025-01-02 16:20:56'),
(54, 145, '665128539474', 0, '2025-01-02 16:10:27', '2025-01-02 16:14:30'),
(55, 146, '733950401110', 0, '2025-01-06 20:59:43', '2025-01-06 21:01:35'),
(56, 146, '329521973703', 0, '2025-01-06 21:03:10', '2025-01-06 21:03:32'),
(57, 147, '138265535940', 0, '2025-01-08 14:48:05', '2025-01-08 14:48:55'),
(58, 148, '77348077901', 1, '2025-01-08 15:39:20', NULL),
(59, 148, '103121552531', 1, '2025-01-08 20:24:39', NULL),
(60, 149, '516560378871', 0, '2025-01-09 17:42:31', '2025-01-09 18:31:44'),
(61, 150, '562578934396', 1, '2025-01-09 17:54:34', '2025-01-09 18:20:34'),
(62, 149, '908754804186', 0, '2025-01-09 18:29:07', '2025-01-09 18:30:08'),
(63, 151, '473124441408', 0, '2025-01-10 19:36:07', '2025-01-10 19:58:35'),
(64, 152, '49042609510', 1, '2025-01-10 21:08:09', NULL),
(65, 153, '913250993581', 0, '2025-01-14 14:04:00', '2025-01-14 14:05:30'),
(66, 154, '339306884037', 0, '2025-01-14 14:08:14', '2025-01-14 14:26:05'),
(67, 155, '99968252890', 0, '2025-01-14 14:14:38', '2025-01-14 14:24:52'),
(68, 156, '370533402928', 0, '2025-01-14 14:19:04', '2025-01-14 14:21:07'),
(69, 157, '478064753928', 0, '2025-01-14 14:21:06', '2025-01-14 14:23:48'),
(70, 158, '500955298353', 0, '2025-01-14 14:24:53', '2025-01-14 14:39:53'),
(71, 159, '618775351303', 0, '2025-01-15 18:23:21', '2025-01-15 18:24:12'),
(72, 135, '888698184085', 0, '2025-01-17 01:34:09', '2025-01-17 01:34:57'),
(73, 135, '776832073672', 1, '2025-01-17 01:34:15', NULL),
(74, 135, '441035641014', 1, '2025-01-17 01:34:18', NULL),
(75, 160, '594117541257', 0, '2025-01-17 18:28:22', '2025-01-17 18:28:57'),
(76, 161, '88915968659', 0, '2025-01-18 11:12:54', '2025-01-18 11:13:35'),
(77, 162, '770702652196', 1, '2025-01-18 11:32:28', NULL),
(78, 163, '702047569524', 0, '2025-01-18 11:39:14', '2025-01-18 11:40:08'),
(79, 143, '76415426816', 1, '2025-01-18 19:29:38', NULL),
(80, 143, '853409894189', 1, '2025-01-18 19:31:19', NULL),
(81, 135, '915514513786', 1, '2025-01-18 19:58:40', NULL),
(82, 164, '465472044158', 0, '2025-01-18 20:10:14', '2025-01-18 20:12:12'),
(83, 134, '240567028914', 1, '2025-01-18 23:18:03', NULL),
(84, 135, '935971045079', 1, '2025-01-18 23:18:14', NULL),
(85, 135, '441580509491', 1, '2025-01-18 23:18:21', NULL),
(86, 165, '459312592686', 0, '2025-01-23 13:32:44', '2025-01-23 13:33:40'),
(87, 135, '18423064984', 1, '2025-01-26 21:45:50', NULL),
(88, 112, '295061781143', 0, '2025-01-26 21:46:08', '2025-01-26 21:46:22'),
(89, 166, '258111316933', 1, '2025-01-26 22:47:38', NULL),
(90, 167, '81300695340', 1, '2025-01-26 22:48:49', NULL),
(91, 168, '576454898644', 1, '2025-01-27 19:16:58', NULL),
(92, 168, '194449107229', 1, '2025-01-27 19:18:16', NULL),
(93, 169, '28389882089', 1, '2025-01-27 19:21:07', NULL),
(94, 169, '440545086027', 1, '2025-01-27 19:21:27', NULL),
(95, 170, '11372505890', 0, '2025-01-27 19:23:12', '2025-01-27 19:24:05'),
(96, 171, '570925152256', 0, '2025-01-30 13:36:09', '2025-01-30 13:39:17'),
(97, 172, '507105033979', 0, '2025-01-30 17:53:02', '2025-01-31 12:50:31'),
(98, 173, '5330425391', 1, '2025-01-30 18:05:05', NULL),
(99, 174, '60057158478', 1, '2025-01-30 18:06:15', NULL),
(100, 175, '848180075526', 1, '2025-01-30 18:07:13', NULL),
(101, 176, '422007199353', 1, '2025-01-30 18:08:13', NULL),
(102, 177, '153624624496', 1, '2025-01-30 18:09:20', NULL),
(103, 178, '97641873191', 1, '2025-01-30 18:10:41', NULL),
(104, 179, '549978112860', 1, '2025-01-30 18:11:32', NULL),
(105, 180, '702602639224', 1, '2025-01-30 18:12:29', NULL),
(106, 181, '4357788806', 1, '2025-01-30 18:13:35', NULL),
(107, 182, '644994541760', 0, '2025-01-30 18:35:39', '2025-01-30 18:38:12'),
(108, 183, '367874783474', 1, '2025-01-30 19:07:04', NULL),
(109, 184, '699453032638', 1, '2025-01-30 19:08:02', NULL),
(110, 185, '635748241661', 1, '2025-01-30 19:08:53', NULL),
(111, 186, '472565014746', 1, '2025-01-30 19:09:51', NULL),
(112, 187, '645066046455', 1, '2025-01-30 19:10:54', NULL),
(113, 188, '369718178128', 1, '2025-01-30 19:11:35', NULL),
(114, 189, '689865509405', 1, '2025-01-30 19:12:32', NULL),
(115, 190, '428541130730', 1, '2025-01-30 19:14:03', NULL),
(116, 191, '249960080202', 1, '2025-01-30 19:14:57', NULL),
(117, 192, '449094831689', 1, '2025-01-30 19:16:19', NULL),
(118, 193, '685239353248', 1, '2025-01-30 19:17:26', NULL),
(119, 194, '865611119925', 1, '2025-01-30 19:19:09', NULL),
(120, 195, '951796354411', 1, '2025-01-30 19:20:44', NULL),
(121, 196, '330939366151', 1, '2025-01-30 19:21:52', NULL),
(122, 197, '175564467720', 1, '2025-01-30 19:22:40', NULL),
(123, 198, '204355918485', 1, '2025-01-30 19:24:00', NULL),
(124, 199, '389440934501', 1, '2025-01-30 19:25:40', NULL),
(125, 200, '880489547241', 1, '2025-01-30 19:26:32', NULL),
(126, 201, '382513333944', 0, '2025-01-30 19:27:17', '2025-01-30 23:42:16'),
(127, 202, '113141777591', 0, '2025-01-30 19:27:54', '2025-01-30 19:34:05'),
(128, 203, '602667170265', 1, '2025-01-30 19:28:43', NULL),
(129, 204, '710164032596', 1, '2025-01-30 19:29:19', NULL),
(130, 205, '36236458174', 1, '2025-01-30 19:30:08', NULL),
(131, 206, '8063583734', 1, '2025-01-30 19:31:19', NULL),
(132, 207, '987848787309', 1, '2025-01-30 19:31:55', NULL),
(133, 208, '515462108891', 1, '2025-01-30 19:32:38', NULL),
(134, 209, '921123893464', 1, '2025-01-30 19:33:17', NULL),
(135, 210, '4166538937', 1, '2025-01-30 19:38:50', NULL),
(136, 211, '974804327844', 1, '2025-01-30 19:39:29', NULL),
(137, 212, '353712822117', 1, '2025-01-30 19:40:37', NULL),
(138, 213, '402447407853', 1, '2025-01-30 19:41:19', NULL),
(139, 214, '459663232418', 1, '2025-01-30 19:42:52', NULL),
(140, 215, '857473797256', 1, '2025-01-30 19:43:28', NULL),
(141, 216, '589097221783', 1, '2025-01-30 19:44:18', NULL),
(142, 217, '680626097906', 1, '2025-01-30 19:45:33', NULL),
(143, 218, '434648775390', 1, '2025-01-30 19:46:13', NULL),
(144, 219, '421396049460', 1, '2025-01-30 19:47:14', NULL),
(145, 220, '588938544196', 1, '2025-01-30 19:47:59', NULL),
(146, 221, '327596791146', 1, '2025-01-30 19:48:34', NULL),
(147, 222, '434767174609', 1, '2025-01-30 19:49:39', NULL),
(148, 223, '982360580221', 1, '2025-01-30 19:50:17', NULL),
(149, 224, '978255745680', 1, '2025-01-30 19:50:56', NULL),
(150, 225, '709991023772', 1, '2025-01-30 19:52:01', NULL),
(151, 226, '780443774684', 1, '2025-01-30 19:53:09', NULL),
(152, 227, '170065707641', 1, '2025-01-30 19:53:59', NULL),
(153, 228, '819745275741', 1, '2025-01-30 19:54:53', NULL),
(154, 229, '827849438154', 1, '2025-01-30 19:55:31', NULL),
(155, 230, '592288973653', 1, '2025-01-30 19:56:30', NULL),
(156, 231, '512232442419', 1, '2025-01-30 19:57:10', NULL),
(157, 232, '305475335279', 1, '2025-01-30 19:58:11', NULL),
(158, 233, '403826673082', 1, '2025-01-30 19:58:48', NULL),
(159, 234, '279602775667', 1, '2025-01-30 19:59:30', NULL),
(160, 235, '645566956233', 1, '2025-01-30 20:00:07', NULL),
(161, 236, '71574108506', 1, '2025-01-30 20:00:49', NULL),
(162, 237, '383001685968', 1, '2025-01-30 20:01:34', NULL),
(163, 238, '116665828018', 1, '2025-01-30 20:02:20', NULL),
(164, 239, '652100421020', 1, '2025-01-30 20:03:08', NULL),
(165, 240, '269928547283', 1, '2025-01-30 20:03:50', NULL),
(166, 241, '617584534191', 1, '2025-01-30 20:04:34', NULL),
(167, 242, '437078549312', 1, '2025-01-30 20:06:03', NULL),
(168, 243, '900436912888', 1, '2025-01-30 20:06:41', NULL),
(169, 244, '883118412351', 1, '2025-01-30 20:07:21', NULL),
(170, 245, '533708272527', 1, '2025-01-30 20:09:50', NULL),
(171, 246, '252499657940', 1, '2025-01-30 20:11:04', NULL),
(172, 247, '833304470176', 1, '2025-01-30 20:12:22', NULL),
(173, 248, '514198510767', 1, '2025-01-30 20:13:18', NULL),
(174, 249, '507375006698', 1, '2025-01-30 20:13:56', NULL),
(175, 201, '241024831972', 1, '2025-01-30 23:43:51', NULL),
(176, 201, '178348203339', 1, '2025-01-30 23:46:16', NULL),
(177, 201, '287265084619', 0, '2025-01-30 23:46:24', '2025-01-30 23:47:12'),
(178, 201, '353698877654', 0, '2025-01-30 23:47:34', '2025-01-30 23:48:01'),
(179, 172, '782461498530', 0, '2025-01-31 13:12:12', '2025-01-31 13:16:27'),
(180, 172, '220540339622', 1, '2025-01-31 13:15:39', NULL),
(181, 250, '715344631617', 0, '2025-02-05 13:45:49', '2025-02-05 13:54:25'),
(182, 206, '938476867327', 0, '2025-02-09 22:48:37', '2025-02-09 22:50:02'),
(183, 155, '88199950659', 0, '2025-02-10 11:54:12', '2025-02-10 11:56:16'),
(184, 149, '752149050318', 0, '2025-02-10 11:54:28', '2025-02-10 11:55:35'),
(185, 251, '123006653570', 0, '2025-02-10 14:39:03', '2025-02-10 14:39:37'),
(186, 250, '273218544135', 0, '2025-02-11 16:04:11', '2025-02-11 16:04:56'),
(187, 252, '232415796329', 0, '2025-02-12 19:22:21', '2025-02-12 19:23:22'),
(188, 253, '654192972984', 1, '2025-02-19 23:18:34', NULL),
(189, 254, '303940948764', 1, '2025-02-20 11:26:23', NULL),
(190, 255, '415847241437', 1, '2025-02-20 11:27:48', NULL),
(191, 253, '631908281102', 1, '2025-02-20 11:29:52', NULL),
(192, 253, '316986933081', 1, '2025-02-20 12:11:00', NULL),
(193, 253, '481461810011', 0, '2025-02-20 12:11:12', '2025-02-20 12:19:07'),
(194, 256, '727922256333', 0, '2025-02-20 12:38:09', '2025-02-20 12:39:34'),
(195, 253, '813820369356', 0, '2025-02-20 14:24:17', '2025-02-20 14:24:54'),
(196, 254, '107084465847', 0, '2025-02-20 14:42:27', '2025-02-20 14:43:15'),
(197, 257, '126130233013', 1, '2025-02-21 14:26:47', NULL),
(198, 257, '763735189953', 0, '2025-02-21 14:56:22', '2025-02-21 14:57:37'),
(199, 219, '149181712018', 0, '2025-02-24 19:12:29', '2025-02-24 19:14:07'),
(200, 206, '972737238064', 0, '2025-02-24 19:12:41', '2025-02-24 19:13:44'),
(201, 242, '28357218630', 0, '2025-03-03 15:44:11', '2025-03-03 15:45:51'),
(202, 243, '489535288051', 0, '2025-03-03 15:44:20', '2025-03-03 15:46:26'),
(203, 244, '618769520828', 0, '2025-03-03 15:44:29', '2025-03-03 15:46:21'),
(204, 258, '420874490450', 0, '2025-03-04 20:52:06', '2025-03-04 20:56:34'),
(205, 258, '574802759044', 1, '2025-03-04 20:52:17', NULL),
(206, 258, '92112441028', 1, '2025-03-04 20:52:59', NULL),
(207, 259, '463551875196', 1, '2025-03-04 20:56:50', NULL),
(208, 259, '715861579190', 1, '2025-03-04 20:57:08', NULL),
(209, 1, '580282799811', 0, '2025-03-14 14:59:10', '2025-03-14 14:59:39');

-- --------------------------------------------------------

--
-- Table structure for table `senales`
--

CREATE TABLE `senales` (
  `id_senal` int NOT NULL,
  `titulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `categoria` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(2000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `imagen` varchar(500) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `video` varchar(500) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `senales`
--

INSERT INTO `senales` (`id_senal`, `titulo`, `categoria`, `descripcion`, `imagen`, `video`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Ceda el Paso', 'Reglamentarias', 'Indica a los conductores que la enfrentan que deben \"Ceder el Paso\" a los vehículos que circulan por la avenida a la cual se aproximan. No es necesario detenerse, si es que existe el espacio y tiempo suficiente para cruzar. ', 'https://storage.googleapis.com/senales_transito/970762033940.svg', 'https://storage.googleapis.com/senales_transito/190583471735_CEDA EL PASO.mp4', 1, '2025-01-04 19:44:47', '2025-03-07 23:11:10'),
(2, 'Pare', 'Reglamentarias', 'Su propósito es ordenar al conductor que detenga completamente su vehículo y sólo avanzar cuando elimine totalmente la posibilidad de accidente. El hecho de no respetarla puede provocar un gravísimo accidente.', 'https://storage.googleapis.com/senales_transito/515114371743.svg', 'https://storage.googleapis.com/senales_transito/553538397787_pare.mp4', 1, '2025-01-04 19:44:48', '2025-03-07 23:22:01'),
(3, 'Pare Niños', 'Reglamentarias', 'Esta señal obliga al conductor a detener totalmente su vehículo en el lugar donde se encuentra para permitir el paso seguro de escolares. Esta señal es portátil y debe ser usada por personal instruido por Carabineros de Chile.', 'https://storage.googleapis.com/senales_transito/513203736504.svg', '', 1, '2025-01-04 19:44:48', NULL),
(4, 'No Entrar', 'Reglamentarias', 'Esta señal prohíbe la continuación del movimiento directo de los vehículos que la enfrentan, es decir, no pueden pasar más allá del lugar en que la señal se encuentra instalada.', 'https://storage.googleapis.com/senales_transito/276601347345.svg', '', 1, '2025-01-04 19:44:48', NULL),
(5, 'No Virar Izquierda', 'Reglamentarias', 'Se emplea para indicar al conductor que no podrá virar a la izquierda en el punto donde se encuentra la señal.', 'https://storage.googleapis.com/senales_transito/268418729817.svg', '', 0, '2025-01-04 19:44:49', '2025-01-04 19:48:03'),
(6, 'No Virar Derecha', 'Reglamentarias', 'Se emplea para indicar al conductor que no podrá virar a la derecha en el punto donde se encuentra la señal.', 'https://storage.googleapis.com/senales_transito/60325151791.svg', '', 1, '2025-01-04 19:44:49', '2025-01-04 19:47:39'),
(7, 'No virar en U', 'Reglamentarias', 'Se usa para indicar al conductor que no puede virar en 180 grados aproximadamente. Al hacerlo interrumpe la circulación de otros vehículos y constituye un factor de riesgo.', 'https://storage.googleapis.com/senales_transito/678925621338.svg', '', 1, '2025-01-04 19:44:49', NULL),
(8, 'No adelantar', 'Reglamentarias', 'Es utilizada para indicar la prohibición de adelantar o sobrepasar a un vehículo, debido a que no se cumplen las condiciones de seguridad para efectuar la maniobra.', 'https://storage.googleapis.com/senales_transito/453742961674.svg', '', 1, '2025-01-04 19:44:50', NULL),
(9, 'No cambiar de pista', 'Reglamentarias', 'Es utilizada para indicar al conductor que no podrá cambiar de pista por la cual va circulando.', 'https://storage.googleapis.com/senales_transito/623156699528.svg', '', 1, '2025-01-04 19:44:50', NULL),
(10, 'Prohibida circulación de vehículos de carga', 'Reglamentarias', 'Se usa para indicar prohibición de circulación de vehículos de carga.', 'https://storage.googleapis.com/senales_transito/123422497984.svg', '', 1, '2025-01-04 19:44:50', NULL),
(11, 'Prohibida circulación de vehículos motorizados', 'Reglamentarias', 'Se usa para indicar prohibición de circulación de vehículos motorizados. Su uso se restringe a áreas peatonales y a vías para vehículos de tracción animal y/o bicicletas.', 'https://storage.googleapis.com/senales_transito/884104893679.svg', '', 1, '2025-01-04 19:44:51', NULL),
(12, 'Prohibida circulación de buses', 'Reglamentarias', 'Esta señal indica la prohibición de circulación de buses.', 'https://storage.googleapis.com/senales_transito/159324864401.svg', '', 1, '2025-01-04 19:44:51', NULL),
(13, 'Prohibida circulación de bicicletas', 'Reglamentarias', 'Esta señal indica la prohibición para circular en bicicleta. Como por ejemplo en autopistas, autovías y túneles.', 'https://storage.googleapis.com/senales_transito/365736078117.svg', '', 1, '2025-01-04 19:44:52', NULL),
(14, 'Prohibida circulación de motocicletas', 'Reglamentarias', 'Esta señal indica la prohibición de circulación de motocicletas o similares.', 'https://storage.googleapis.com/senales_transito/175062817393.svg', '', 1, '2025-01-04 19:44:52', NULL),
(15, 'Prohibida circulación de maquinaria agrícola', 'Reglamentarias', 'Se utiliza para prohibir la circulación de maquinaria agrícola, como tractores, trilladoras, etc. por determinadas vías como, por ejemplo: autopistas, autovías, túneles y puentes largos. Su circulación crea riesgos de accidentes.', 'https://storage.googleapis.com/senales_transito/256796025113.svg', '', 1, '2025-01-04 19:44:52', NULL),
(16, 'Prohibida circulación de vehículos tracción animal', 'Reglamentarias', 'Esta señal es empleada para indicar que está prohibida la circulación de toda clase de vehículos de tracción animal. Ejemplo: carretelas. Generalmente se utiliza en vías principales y en grandes ciudades.', 'https://storage.googleapis.com/senales_transito/93020257884.svg', '', 1, '2025-01-04 19:44:53', NULL),
(17, 'Prohibida circulación de vehículos de carro de mano', 'Reglamentarias', 'Esta señal prohíbe la circulación de toda clase de vehículos a tracción humana. Por ejemplo, en autopistas, autovías, túneles, puentes largos y en las principales calles y avenidas de ciudades grandes.', 'https://storage.googleapis.com/senales_transito/348820335757.svg', '', 1, '2025-01-04 19:44:53', NULL),
(18, 'Silencio', 'Reglamentarias', 'Se utiliza para prohibir el uso de aparatos sonoros o la generación de altos niveles de ruidos por medio de aceleraciones bruscas. Se instala en zonas de hospitales, bibliotecas y recintos en los que por el tipo de actividades que en ellos se desarrollan así lo aconsejan.', 'https://storage.googleapis.com/senales_transito/765271729536.svg', '', 1, '2025-01-04 19:44:53', NULL),
(19, 'Prohibido estacionar', 'Reglamentarias', 'Se usa para indicar la prohibición de estacionar a partir de donde se encuentra la señal, ya que al hacerlo puede interrumpir la circulación de los demás vehículos.  Esta señal puede ir reforzada con una franja pintada amarilla en el borde de la cuneta para indicar todo el tramo donde esta prohibido estacionar. ', 'https://storage.googleapis.com/senales_transito/468680134682.svg', '', 1, '2025-01-04 19:44:54', NULL),
(20, 'Prohibido estacionar y detenerse', 'Reglamentarias', 'Se usa para indicar la prohibición de estacionar y/o detener un vehículo, a partir del lugar donde ella se encuentra. Al hacerlo se interrumpe la libre circulación de los demás vehículos.', 'https://storage.googleapis.com/senales_transito/385167937044.svg', '', 1, '2025-01-04 19:44:54', NULL),
(21, 'No peatones', 'Reglamentarias', 'Se emplea para prohibir la circulación de peatones. Generalmente se utiliza en zonas rurales, donde exista alto flujo vehicular.', 'https://storage.googleapis.com/senales_transito/187530534988.svg', '', 1, '2025-01-04 19:44:54', NULL),
(22, 'No bloquear cruce', 'Reglamentarias', 'Indica la prohibición a los conductores de quedar detenido dentro de un cruce por cualquier razón, de manera de no interrumpir la circulación de los demás vehículos.', 'https://storage.googleapis.com/senales_transito/55501265766.svg', '', 1, '2025-01-04 19:44:54', NULL),
(23, 'Velocidad máxima', 'Reglamentarias', 'Se utiliza para indicar la velocidad máxima permitida a la que los vehículos pueden circular en un tramo de vía determinado.', 'https://storage.googleapis.com/senales_transito/699585384309.svg', '', 1, '2025-01-04 19:44:55', NULL),
(24, 'Velocidad mínima', 'Reglamentarias', 'Se usa para establecer la velocidad mínima permitida a la que los vehículos pueden circular en un tramo de vía determinado.', 'https://storage.googleapis.com/senales_transito/121332601707.svg', '', 1, '2025-01-04 19:44:55', NULL),
(25, 'Circulación en ambos sentidos', 'Reglamentarias', 'Es utilizada para indicar a los conductores de vehículos que, están circulando por una vía de un sentido que a partir de esta señal, la vía se transforma en una arteria de dos sentidos de tránsito.', 'https://storage.googleapis.com/senales_transito/888033903789.svg', '', 1, '2025-01-04 19:44:55', NULL),
(26, 'Peso máximo permitido', 'Reglamentarias', 'Se emplea para restringir la circulación de vehículos cuyo peso total, en toneladas, supere el indicado en ella.', 'https://storage.googleapis.com/senales_transito/526927051478.svg', '', 1, '2025-01-04 19:44:56', NULL),
(27, 'Peso máximo por eje', 'Reglamentarias', 'Se utiliza para indicar el peso máximo permitido por eje, en toneladas. Se utiliza generalmente en caminos, puentes y otras obras de arte civil que requieran tal limitación.', 'https://storage.googleapis.com/senales_transito/733827575311.svg', '', 1, '2025-01-04 19:44:56', NULL),
(28, 'Altura máxima', 'Reglamentarias', 'Se utiliza para indicar la altura máxima que permite un túnel, puente, paso a desnivel u otros obstáculos.', 'https://storage.googleapis.com/senales_transito/313960603160.svg', '', 1, '2025-01-04 19:44:56', NULL),
(29, 'Ancho máximo', 'Reglamentarias', 'Se usa para señalar el ancho máximo que permite un puente, túnel y caminos o calles que no soportan anchos mayores.', 'https://storage.googleapis.com/senales_transito/271105609319.svg', '', 1, '2025-01-04 19:44:57', NULL),
(30, 'Largo máximo', 'Reglamentarias', 'Esta señal se utiliza para regular la circulación de vehículos de un largo superior a “X” metros.', 'https://storage.googleapis.com/senales_transito/375634128724.svg', '', 1, '2025-01-04 19:44:57', NULL),
(31, 'Fin prohibición o restricción', 'Reglamentarias', 'Indica a los conductores el término de una prohibición o restricción previamente establecida.', 'https://storage.googleapis.com/senales_transito/373484430285.svg', '', 1, '2025-01-04 19:44:57', NULL),
(32, 'Tránsito en un sentido', 'Reglamentarias', 'Es usada para indicar el sentido del tránsito en una vía. Generalmente está unida a otra señal que informa el nombre y numeración de la calle o vía.', 'https://storage.googleapis.com/senales_transito/285103853460.svg', '', 1, '2025-01-04 19:44:58', NULL),
(33, 'Tránsito en ambos sentidos', 'Reglamentarias', 'Se utiliza para indicar dos sentidos de tránsito en una calle o vía. Puede estar unida lateralmente a otra placa que informe el nombre y numeración de la calle o vía.', 'https://storage.googleapis.com/senales_transito/530444808615.svg', '', 1, '2025-01-04 19:44:58', NULL),
(34, 'Mantenga su derecha', 'Reglamentarias', 'Se instala para indicar a los conductores que deben circular por la derecha, para dejar libre las pistas de la izquierda y facilitar así la circulación de los demás vehículos.', 'https://storage.googleapis.com/senales_transito/187135205080.svg', '', 1, '2025-01-04 19:44:58', NULL),
(35, 'Dirección obligada', 'Reglamentarias', 'Es utilizada para señalar a los conductores de vehículos la obligación de circular en la dirección y sentido indicado por la flecha. Hacia arriba indica la obligación de continuar de frente.', 'https://storage.googleapis.com/senales_transito/416020603215.svg', '', 1, '2025-01-04 19:44:59', NULL),
(36, 'Preferencia al sentido contrario', 'Reglamentarias', 'Se usa para indicar a los conductores que los vehículos que circulan en sentido opuesto tienen prioridad. Por ejemplo: en puentes estrechos, angostamiento de calzadas, etc.', 'https://storage.googleapis.com/senales_transito/127359795360.svg', '', 1, '2025-01-04 19:44:59', NULL),
(37, 'Paso obligado derecha', 'Reglamentarias', 'Es utilizada para indicar a los conductores que deben continuar circulando por el lado de la calzada que indica la punta de la flecha.', 'https://storage.googleapis.com/senales_transito/819492174226.svg', '', 1, '2025-01-04 19:44:59', NULL),
(38, 'Paso obligado izquierda', 'Reglamentarias', 'Es utilizada para indicar a los conductores que deben continuar circulando por el lado de la calzada que indica la punta de la flecha.', 'https://storage.googleapis.com/senales_transito/203187080720.svg', '', 1, '2025-01-04 19:45:00', NULL),
(39, 'Paso vértice', 'Reglamentarias', 'Es utilizada para indicar la existencia de un vértice de separación de flujos que circulan en un mismo sentido.', 'https://storage.googleapis.com/senales_transito/974194897648.svg', '', 1, '2025-01-04 19:45:00', NULL),
(40, 'Mini rotonda', 'Reglamentarias', 'Se utiliza en el acceso a minirrotondas, junto a la señal ceda el paso.', 'https://storage.googleapis.com/senales_transito/800450206521.svg', '', 1, '2025-01-04 19:45:00', NULL),
(41, 'Sólo televía o sistema complementario', 'Reglamentarias', 'Esta señal indica a los conductores que circulen por la pista o vía, según corresponda que, a partir de la indicación de la señal, será obligatorio para el vehículo que transita por ella estar provisto del dispositivo de cobro electrónico denominado TELEVÍA o de otro sistema complementario que se encuentre vigente y cuyo uso fuere debidamente autorizado y aprobado por el Ministerio de Obras Públicas.', 'https://storage.googleapis.com/senales_transito/865430820737.svg', '', 0, '2025-01-04 19:45:01', '2025-01-04 19:48:38'),
(42, 'Control aduana', 'Reglamentarias', 'Es utilizada para indicar la existencia de un punto de control de cualquier naturaleza, donde el vehículo debe detenerse. Ejemplo: Aduana, Fitosanitario, Carabineros, etc.', 'https://storage.googleapis.com/senales_transito/688616112427.svg', '', 1, '2025-01-04 19:45:01', NULL),
(43, 'Uso obligatorio de cadenas', 'Reglamentarias', 'Es utilizada para indicar a los conductores que a partir de esa señal es obligatorio el uso de cadenas adecuadas para los neumáticos del vehículo.', 'https://storage.googleapis.com/senales_transito/30950476491.svg', '', 1, '2025-01-04 19:45:01', '2025-01-04 19:48:36'),
(44, 'Luces encendidas', 'Reglamentarias', 'Esta señal indica que aun siendo de día, y habiendo visibilidad suficiente, los vehículos deben circular con luces bajas encendidas, a menos que cuenten con sistemas de luces diurnas.', 'https://storage.googleapis.com/senales_transito/603272697810.svg', '', 1, '2025-01-04 19:45:02', NULL),
(45, 'Sólo bicicletas', 'Reglamentarias', 'Es utilizada para indicar la existencia de una pista o vía exclusiva para bicicletas.', 'https://storage.googleapis.com/senales_transito/298381426369.svg', '', 1, '2025-01-04 19:45:02', NULL),
(46, 'Sólo motocicletas', 'Reglamentarias', 'Esta señal tiene aplicación netamente urbana y se usa para indicar que una pista o vía es exclusiva para la circulación de motocicletas.', 'https://storage.googleapis.com/senales_transito/584127457629.svg', '', 1, '2025-01-04 19:45:02', '2025-01-08 00:30:49'),
(47, 'Superficie segregada peatones - biciclos', 'Reglamentarias', 'Es utilizada para indicar a los peatones la existencia de una vía exclusiva para bicicletas y que deben caminar por el costado de ésta, enfrentando la circulación de biciclos.', 'https://storage.googleapis.com/senales_transito/457824668309.svg', '', 1, '2025-01-04 19:45:03', NULL),
(48, 'Vía segregada buses', 'Reglamentarias', 'Es utilizada para indicar la existencia de una pista o vía exclusiva para buses.', 'https://storage.googleapis.com/senales_transito/412328426356.svg', '', 1, '2025-01-04 19:45:03', NULL),
(49, 'Estacionamiento permitido', 'Reglamentarias', 'Se utiliza para indicar a los conductores la existencia de un lugar autorizado para estacionar vehículos.', 'https://storage.googleapis.com/senales_transito/340986048787.svg', '', 1, '2025-01-04 19:45:03', NULL),
(50, 'Permitido virar derecha con luz roja', 'Reglamentarias', 'Se emplea para indicar a los conductores que accedan a una intersección controlada por semáforos, que está permitido el viraje hacia la derecha con luz roja, previa detención y dando preferencia a peatones.', 'https://storage.googleapis.com/senales_transito/780116912648.svg', '', 1, '2025-01-04 19:45:04', NULL),
(51, 'Primeros Auxilios', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/116.svg', '', 1, '2025-01-20 00:27:37', NULL),
(52, 'Oficina de Informaciones', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/117.svg', '', 1, '2025-01-20 00:27:37', NULL),
(53, 'Teléfono', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/118.svg', '', 1, '2025-01-20 00:27:37', NULL),
(54, 'Estación de Servicio', 'Informativas - Autopistas y Ciclovías', 'Punto de venta de combustibles, lubricantes y otros productos y servicios para\n                                        los vehículos. Opcionalmente con servicios para el conductor como alimentación y\n                                        servicios higiénicos.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/5dd7038141602836749280.svg', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:00:29'),
(55, 'Correo', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/120.svg', '', 1, '2025-01-20 00:27:37', NULL),
(56, 'Mecánica', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/121.svg', '', 1, '2025-01-20 00:27:37', NULL),
(57, 'Servicios Higiénicos', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/122.svg', '', 1, '2025-01-20 00:27:37', NULL),
(58, 'Alimentación', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/123.svg', '', 1, '2025-01-20 00:27:37', NULL),
(59, 'Hospedaje', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/124.svg', '', 1, '2025-01-20 00:27:37', NULL),
(60, 'Refugio', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/125.svg', '', 1, '2025-01-20 00:27:37', NULL),
(61, 'Aeropuerto', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/126.svg', '', 1, '2025-01-20 00:27:37', NULL),
(62, 'Cancha de Aterrizaje', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/127.svg', '', 1, '2025-01-20 00:27:37', NULL),
(63, 'Estación de Ferrocarriles', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/128.svg', '', 1, '2025-01-20 00:27:37', NULL),
(64, 'Transbordador', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/129.svg', '', 1, '2025-01-20 00:27:37', NULL),
(65, 'Andarivel', 'Informativas - Autopistas y Ciclovías', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/130.svg', '', 1, '2025-01-20 00:27:37', NULL),
(66, 'Plaza de Peaje', 'Informativas - Autopistas y Ciclovías', 'Esta señal se utiliza para informar la proximidad de una plaza de peaje; debe\n                                        acompañarse de una placa adicional que indique la distancia de ella.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/131.svg', '', 1, '2025-01-20 00:27:37', NULL),
(67, 'Plaza de Pesaje', 'Informativas - Autopistas y Ciclovías', 'Esta señal se utiliza para informar la proximidad de una plaza de pesaje; debe\n                                        acompañarse de una placa adicional que indique la distancia de ella', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/132.svg', '', 1, '2025-01-20 00:27:37', NULL),
(68, 'Parada de Buses', 'Informativas - Autopistas y Ciclovías', 'Lugar donde está autorizada la detención de buses de transporte público para\n                                        tomar o dejar pasajeros. Tratándose de sistemas de paradas diferidas se puede\n                                        utilizar una señal especial, aprobada mediante resolución por el Secretario\n                                        Regional Ministerial de Transportes y Telecomunicaciones.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/133.svg', '', 1, '2025-01-20 00:27:37', NULL),
(69, 'Control Fotográfico', 'Informativas - Autopistas y Ciclovías', 'Esta señal se usa para informar la proximidad de una zona en que se utilizan\n                                        equipos de registro fotográfico de infracciones.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/134.svg', '', 1, '2025-01-20 00:27:37', NULL),
(70, 'Pista sólo Buses', 'Informativas - Autopistas y Ciclovías', 'Esta señal informa la proximidad de pistas exclusivas para buses. Debe ser\n                                        instalada de manera de indicar con la suficiente anticipación el inicio de tal\n                                        modalidad. Tiene fondo verde y su símbolo es blanco.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/135.svg', '', 1, '2025-01-20 00:27:37', NULL),
(71, 'Vía Perpendicular con Pista Sólo Buses', 'Informativas - Autopistas y Ciclovías', 'Esta señal se utiliza para informar que en la próxima vía perpendicular existe\n                                        una pista exclusiva para buses, cuando el viraje a la derecha no está\n                                        restringido', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/136.svg', '', 1, '2025-01-20 00:27:37', NULL),
(72, 'Salida Antes de Ingresar a Autopista', 'Informativas - Autopistas y Ciclovías', 'Se emplea para indicar la última salida antes de ingresar a la autopista.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/137.svg', '', 1, '2025-01-20 00:27:37', NULL),
(73, 'Retorno de Autopista', 'Informativas - Autopistas y Ciclovías', 'Se emplea para indicar la posibilidad de realizar el movimiento de retorno a\n                                        desnivel en la siguiente salida lateral de la autopista.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/138.svg', '', 1, '2025-01-20 00:27:37', NULL),
(74, 'Salida Lateral Derecha', 'Informativas - Autopistas y Ciclovías', 'Se emplea para indicar la salida de la autopista.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/139.svg', '', 1, '2025-01-20 00:27:37', NULL),
(75, 'Fin de Autopista', 'Informativas - Autopistas y Ciclovías', 'Se utiliza para indicar el fin de autopista.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/140.svg', '', 1, '2025-01-20 00:27:37', NULL),
(76, 'Inicio Autopista', 'Informativas - Autopistas y Ciclovías', 'Se utiliza para indicar el inicio de autopista.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/141.svg', '', 1, '2025-01-20 00:27:37', NULL),
(77, 'Preseñalización de Lugar Habilitado para Estacionar', 'Informativas - Autopistas y Ciclovías', 'Se emplea para indicar la proximidad de un lugar permitido para estacionar en la\n                                        vía.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/142.svg', '', 1, '2025-01-20 00:27:37', NULL),
(78, 'Teléfono de Emergencia', 'Informativas - Autopistas y Ciclovías', 'Se emplea para indicar el lugar donde existe teléfono de emergencia que\n                                                comunica con personal de la vía por la cual transita.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/143.svg', '', 1, '2025-01-20 00:27:37', NULL),
(79, 'Salida', 'Informativas - Autopistas y Ciclovías', 'Se emplea para indicar donde nace la bifurcación hacia la salida.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/5dd704f7999a3169777818.svg', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:00:41'),
(80, 'Proximidad de Autopista', 'Informativas - Autopistas y Ciclovías', 'Se emplea para indicar la cercanía de una autopista urbana que cuenta con\n                                        sistema Televía', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/145.svg', '', 1, '2025-01-20 00:27:37', NULL),
(81, 'Balizas de Acercamiento', 'Informativas - Autopistas y Ciclovías', 'Se emplea para indicar en autopista el inicio de la pista de desaceleración de\n                                        salida a 300-200 y 100 Mts.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/146.svg', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:32'),
(82, 'Zona de Tránsito Calmado', 'Informativas - Autopistas y Ciclovías', 'Estas señales de tránsito se utilizan en\n                                                        las Zonas que requieren un tránsito mas lento\n                                                        restringiendo la\n                                                        velocidad máxima a 20, 30 o 40 km/hr. según requiera la\n                                                        condición de la vía.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054f503c1259248981232.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:34'),
(83, 'Preferencia Ciclistas al Cambiar de Pista', 'Informativas - Autopistas y Ciclovías', 'Se utilizan para indicar al conductor de\n                                                        un vehículo motorizado que tiene la intención de cambiar de pista hacia\n                                                        la derecha o izquierda cruzando una ciclovía, que los ciclistas que circulan por ésta\n                                                        tienen preferencia,\n                                                        por lo que debe cederles el paso.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054f729aba8e997103443.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:35'),
(84, 'Preferencia Ciclistas al Virar.', 'Informativas - Autopistas y Ciclovías', 'Se utilizan para indicar al conductor de\n                                                        un vehículo motorizado que tiene la \n                                                intención\n                                                                de virar a la izquierda o a la derecha cruzando una\n                                                                ciclovía, que los ciclistas que circulan por\n                                                        ésta \n                                                tienen\n                                                                preferencia, por lo que debe cederles el\n                                                        paso.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054f7ff00df6001255826.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:36'),
(85, 'Desmonte de Ciclista', 'Informativas - Autopistas y Ciclovías', 'Esta señal se utiliza en los pasos\n                                                        peatonales semaforizados u otra vías peatonales en que no exista\n                                                        una facilidad de circulación para ciclistas e indicar a éstos\n                                                        que deben\n                                                                bajarse de la bicicleta y circular como peatones cuando\n                                                                el flujo peatonal sea intenso.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054f8c5af74e868073115.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:37'),
(86, 'Control de Velocidad con Cámara', 'Informativas - Autopistas y Ciclovías', 'Esta señal se usa para informar la proximidad\n                                                        de una zona en la\n                                                        que se utilizan cámaras para el registro de\n                                                infracciones asociadas a los\n                                                        límites de velocidad\n                                                        máxima.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054f9ca6b014409791306.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:38'),
(87, 'Zona de Espera Adelantada Motos (1)', 'Informativas - Autopistas y Ciclovías', 'Esta señal se usa en intersecciones\n                                                        semaforizadas para informar sobre la\n                                                        existencia de una línea de detención adelantada para\n                                                        motociclistas,\n                                                        generando una zona de espera para éstos.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054fb0a2a588689391243.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:39'),
(88, 'Zona de Espera Adelantada Motos (2)', 'Informativas - Autopistas y Ciclovías', 'Esta señal se usa para\n                                                        informar intersecciones semaforizadas y\n                                                        cuando hay Pista Solo Buses, sobre la existencia de\n                                                        una línea de\n                                                        detención adelantada para motociclistas, generando una zona de espera para\n                                                        éstos.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054fb949b0b7790031002.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:39'),
(89, 'Zona de Espera Adelantada Motos (3)', 'Informativas - Autopistas y Ciclovías', 'Esta señal se usa para\n                                                        informar en\n                                                        intersecciones semaforizadas cuando hay Pista Solo\n                                                        Buses, y cuando está\n                                                        permitido el viraje a la derecha, sobre la existencia de\n                                                        una línea de\n                                                        detención adelantada para motociclistas, generando una zona de espera para\n                                                        éstos.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054fc1645223650263764.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:40'),
(90, 'Zona de 30 y Fin Zona de 30.', 'Informativas - Autopistas y Ciclovías', 'Estas señales se usan para informar\n                                                        que se está\n                                                        circulando por una vía o abandonando ésta, según sea el caso, que forma\n                                                        parte de una zona de tránsito calmado, en que la velocidad se ha limitado\n                                                        a 20, 30 o 40 km/h,\n                                                        según corresponda.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054fcc678ec5891398813.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:41'),
(91, 'Ciclocalle', 'Informativas - Autopistas y Ciclovías', 'Esta señal se instala en\n                                                        ciclocalles, en las\n                                                        cuales la velocidad máxima permitida no debe exceder los 30\n                                                        km/h. Se debe\n                                                        acompañar con la señal reglamentaria de velocidad\n                                                        máxima, indicando 30\n                                                        kh/h.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054fd354b8ac024640950.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:45'),
(92, 'Zona Espera Especial Ciclos.', 'Informativas - Autopistas y Ciclovías', 'Estas señales se instalan en cruces\n                                                        semaforizados, donde\n                                                        se haya generado una zona de espera para que los ciclos puedan realizar\n                                                        partidas adelantadas.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054fd9fcbdfe490506985.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:46'),
(93, 'Zona Compartida Peatones Ciclos.', 'Informativas - Autopistas y Ciclovías', 'Esta señal se utiliza principalmente en parques que cuentan con\n                                                        facilidades para la circulación de ciclos, que pueden formar una\n                                                        cicloruta, y en\n                                                        las que el espacio público es compartido por peatones y\n                                                        ciclistas.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054fdfd1e245784243113.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:47'),
(94, 'Zona de Espera Especial Ciclos (Viraje)', 'Informativas - Autopistas y Ciclovías', 'Esta señal informativa se instala en los cruces\n                                                        semaforizados en\n                                                        los que se haya generado una zona de espera para\n                                                        ciclistas, e\n                                                        indica a éstos una forma más segura de virar.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6056081d38cb4248786020.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:48'),
(95, 'Doble Chevron', 'Informativas - Autopistas y Ciclovías', 'El Doble Chevron dirige al ciclista\n                                                        para circular fuera del área que abarca la apertura de puertas\n                                                        de los autos estacionados o para alejarlos de pistas\n                                                        donde los vehículos motorizados circule a\n                                                        contraflujo.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/6054fef9bf51f138207600.png', '', 0, '2025-01-20 00:27:37', '2025-02-14 04:01:51'),
(96, 'EN ZONAS RURALES TRANSITE POR SU IZQUIERDA', 'Consejos a Peatones', 'En lugares donde no exista solera o vereda, transite siempre\nenfrentando el tránsito vehicular (Por su izquierda) ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/61ba88dc9fb62925737963.svg', '', 1, '2025-01-20 00:31:16', NULL),
(97, 'NO CRUCE EN FORMA DIAGONAL', 'Consejos a Peatones', 'EN UN CRUCE NUNCA ATRAVIESE DE MANERA DIAGONAL,  al hacerlo infringe la normativa y aumenta el riesgo\nde atropello por mala ubicación en la vía, además usted recorrerá mayor distancia y necesitará mas tiempo de al cruzar. ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/61ba8da22d0df194727674.png', '', 0, '2025-01-20 00:31:16', '2025-02-14 04:02:14'),
(98, 'EVITE TRANSITAR CERCA DE LA CUNETA', 'Consejos a Peatones', 'Si usted camina por el borde de la acera o espera la luz verde al borde de la solera se expone a ser golpeado por un vehículo o por los elementos que\nsobresalen de ellos. Ejemplo; Espejos laterales, elementos de carga,\netc. Hágalo siempre por el lado izquierdo, enfrentando el tránsito vehicular.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/61ba924a6096d548274402.svg', '', 1, '2025-01-20 00:31:16', NULL),
(99, 'NO BAJE DE UN VEHÍCULO HACIA LA VÍA', 'Consejos a Peatones', 'Como pasajero, al bajarse de un automóvil hágalo por la puerta que da hacia la acera y no por la puerta que va a la vía de tránsito vehicular, en tal caso usted podría ser golpeado por otro vehículo que no se percate de la situación. Además siempre mire hacia atrás para asegurarse que no viene un ciclista. ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/61bb32c567155833588588.png', '', 0, '2025-01-20 00:31:16', '2025-02-14 04:02:19'),
(100, 'SIEMPRE ESPERE LA LUZ VERDE DEL SEMÁFORO', 'Consejos a Peatones', 'Además, al cruzar la vía  con luz verde o pasos peatonales no se confíe, aunque usted  tenga la preferencia siempre debe estar atento ante el posible\ndescuido de algún conductor. ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/61bb310cc5ca2589611338.png', '', 0, '2025-01-20 00:31:16', '2025-02-14 04:02:20'),
(101, 'NO CRUCE ENTRE VEHÍCULOS ESTACIONADOS', 'Consejos a Peatones', 'NUNCA CRUCE\nENTRE VEHÍCULOS ESTACIONADOS Y MENOS SI ESTAN EN MOVIMIENTO,  recuerde no cruzar entre vehículos que estén\nestacionados o detenidos momentáneamente, al hacerlo se expone a ser\natropellado porque en ese momento usted no será visible para los conductores que circulan por la vía, además ellos podrían no estar preparados para .encontrarse con un peatón repentinamente. USE SIEMPRE LOS PASOS PEATONALES Y PASARELAS. ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/61bb567f15769566266096.png', '', 0, '2025-01-20 00:31:16', '2025-02-14 04:02:24'),
(102, 'Paleontología', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/147.svg', '', 1, '2025-01-20 00:33:35', NULL),
(103, 'Fauna', 'Atractivo Turístico', 'Fotografía: https://www.instagram.com/jm.wildlife/', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/148.svg', '', 1, '2025-01-20 00:33:35', NULL),
(104, 'Flora', 'Atractivo Turístico', 'Fotografía: https://www.instagram.com/jm.wildlife/', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/149.svg', '', 1, '2025-01-20 00:33:35', NULL),
(105, 'Biología marina y/o piscicultura', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/150.svg', '', 1, '2025-01-20 00:33:35', NULL),
(106, 'Geología', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/151.svg', '', 1, '2025-01-20 00:33:35', NULL),
(107, 'Cascada', 'Atractivo Turístico', 'Fotografía: https://www.instagram.com/jm.wildlife/', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/152.svg', '', 1, '2025-01-20 00:33:35', NULL),
(108, 'Cerro', 'Atractivo Turístico', 'Fotografía: https://www.instagram.com/jm.wildlife/', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/154.svg', '', 1, '2025-01-20 00:33:35', NULL),
(109, 'Monumento Religioso', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/155.svg', '', 1, '2025-01-20 00:33:35', NULL),
(110, 'Pueblo o Arquitectura Interesante', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/156.svg', '', 1, '2025-01-20 00:33:35', NULL),
(111, 'Sitio Histórico', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/157.svg', '', 1, '2025-01-20 00:33:35', NULL),
(112, 'Monumento Histórico', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/158.svg', '', 1, '2025-01-20 00:33:35', NULL),
(113, 'Arqueología', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/159.svg', '', 1, '2025-01-20 00:33:35', NULL),
(114, 'Caverna', 'Atractivo Turístico', 'Fotografía: https://www.instagram.com/jm.wildlife/', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/160.svg', '', 1, '2025-01-20 00:33:35', NULL),
(115, 'Glaciar', 'Atractivo Turístico', 'Fotografía: https://www.instagram.com/jm.wildlife/', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/161.svg', '', 1, '2025-01-20 00:33:35', NULL),
(116, 'Volcán', 'Atractivo Turístico', 'Fotografía: https://www.instagram.com/jm.wildlife/', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/162.svg', '', 1, '2025-01-20 00:33:35', NULL),
(117, 'Obra de Ingeniería', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/163.svg', '', 1, '2025-01-20 00:33:35', NULL),
(118, 'Museo', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/164.svg', '', 1, '2025-01-20 00:33:35', NULL),
(119, 'Investigación', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/165.svg', '', 1, '2025-01-20 00:33:35', NULL),
(120, 'Centro Tecnológico', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/166.svg', '', 1, '2025-01-20 00:33:35', NULL),
(121, 'Rodeo', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/167.svg', '', 1, '2025-01-20 00:33:35', NULL),
(122, 'Folclore', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/168.svg', '', 1, '2025-01-20 00:33:35', NULL),
(123, 'Artesanía', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/169.svg', '', 1, '2025-01-20 00:33:35', NULL),
(124, 'Natación', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/170.svg', '', 1, '2025-01-20 00:33:35', NULL),
(125, 'Ski', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/171.svg', '', 1, '2025-01-20 00:33:35', NULL),
(126, 'Escalamiento', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/172.svg', '', 1, '2025-01-20 00:33:35', NULL),
(127, 'Excursión', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/173.svg', '', 1, '2025-01-20 00:33:35', NULL),
(128, 'Deportes en General', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/174.svg', '', 1, '2025-01-20 00:33:35', NULL),
(129, 'Deportes Náuticos', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/175.svg', '', 1, '2025-01-20 00:33:35', NULL),
(130, 'Playa', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/176.svg', '', 1, '2025-01-20 00:33:35', NULL),
(131, 'Ski Acuático', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/177.svg', '', 1, '2025-01-20 00:33:35', NULL),
(132, 'Buceo', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/178.svg', '', 1, '2025-01-20 00:33:35', NULL),
(133, 'Equitación o Hípica', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/179.svg', '', 1, '2025-01-20 00:33:35', NULL),
(134, 'Pesca', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/180.svg', '', 1, '2025-01-20 00:33:35', NULL),
(135, 'Caza', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/181.svg', '', 1, '2025-01-20 00:33:35', NULL),
(136, 'Juegos Infantiles', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/182.svg', '', 1, '2025-01-20 00:33:35', NULL),
(137, 'Termas', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/183.svg', '', 1, '2025-01-20 00:33:35', NULL),
(138, 'Picnic', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/184.svg', '', 1, '2025-01-20 00:33:35', NULL),
(139, 'Camping', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/185.svg', '', 1, '2025-01-20 00:33:35', NULL),
(140, 'Paseo Náutico', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/186.svg', '', 1, '2025-01-20 00:33:35', NULL),
(141, 'Mina', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/187.svg', '', 1, '2025-01-20 00:33:35', NULL),
(142, 'Gastronomía Típica', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/188.svg', '', 1, '2025-01-20 00:33:35', NULL),
(143, 'Fotografía', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/189.svg', '', 1, '2025-01-20 00:33:35', NULL),
(144, 'Casino', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/190.svg', '', 1, '2025-01-20 00:33:35', NULL),
(145, 'Tranque', 'Atractivo Turístico', '', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/191.svg', '', 1, '2025-01-20 00:33:35', NULL),
(146, 'Parque Nacional', 'Atractivo Turístico', 'Fotografía: https://www.instagram.com/jm.wildlife/', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/192.svg', '', 1, '2025-01-20 00:33:35', NULL),
(147, 'Curva a la derecha', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de una curva cuya velocidad de diseño es menor que la velocidad máxima o de operación del resto de la vía.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/52.svg', '', 1, '2025-01-20 00:36:31', NULL),
(148, 'Curva cerrada a la derecha', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de una curva, cuya velocidad de diseño es menor a 50 Km/Hr., lo que obliga a los conductores a poner más atención y disminuir la velocidad.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/53.svg', '', 1, '2025-01-20 00:36:31', NULL),
(149, 'Zona de curvas a la derecha', 'Advertencia de Peligro', 'Estas señales se usan para advertir la proximidad de una zona con tres o más curvas consecutivas de sentidos opuestos y cuya velocidad de diseño es menor que la velocidad máxima o de operación de la vía.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/54.svg', '', 1, '2025-01-20 00:36:31', NULL),
(150, 'Curva y contracurva a la derecha', 'Advertencia de Peligro', 'Estas señales se usan para advertir la proximidad de dos curvas consecutivas y en sentido contrario y cuya velocidad de diseño es menor que la velocidad máxima o de operación de la vía.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/55.svg', '', 1, '2025-01-20 00:36:31', NULL),
(151, 'Curva y contracurva cerrada a la derecha', 'Advertencia de Peligro', 'Es utilizada para advertir la proximidad de dos curvas consecutivas y en sentido contrario, cuando al menos una de ellas es cerrada.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/56.svg', '', 1, '2025-01-20 00:36:31', NULL),
(152, 'Curva muy cerrada a la derecha', 'Advertencia de Peligro', 'Estas señales se utilizan para advertir la proximidad de una curva de aproximadamente 180 grados.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/57.svg', '', 1, '2025-01-20 00:36:31', NULL),
(153, 'Curva a la izquierda', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de una curva cuya velocidad de diseño es menor que la velocidad máxima o de operación del resto de la vía.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/58.svg', '', 1, '2025-01-20 00:36:31', NULL),
(154, 'Curva cerrada a la izquierda', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de una curva, cuya velocidad de diseño es menor a 50 Km/Hr., lo que obliga a los conductores a poner más atención y disminuir la velocidad.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/651f47d2b3892711031131.png', '', 0, '2025-01-20 00:36:31', '2025-02-14 03:59:55'),
(155, 'Zona de curvas a la izquierda', 'Advertencia de Peligro', 'Estas señales se usan para advertir la proximidad de una zona con tres o más curvas consecutivas de sentidos opuestos y cuya velocidad de diseño es menor que la velocidad máxima o de operación de la vía.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/60.svg', '', 1, '2025-01-20 00:36:31', NULL),
(156, 'Curva y contracurva a la izquierda', 'Advertencia de Peligro', 'Estas señales se usan para advertir la proximidad de dos curvas consecutivas y en sentido contrario y cuya velocidad de diseño es menor que la velocidad máxima o de operación de la vía.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/61.svg', '', 1, '2025-01-20 00:36:31', NULL);
INSERT INTO `senales` (`id_senal`, `titulo`, `categoria`, `descripcion`, `imagen`, `video`, `activo`, `created_at`, `updated_at`) VALUES
(157, 'Curva y contracurva cerrada a la izquierda', 'Advertencia de Peligro', 'Es utilizada para advertir la proximidad de dos curvas consecutivas y en sentido contrario, cuando al menos una de ellas es cerrada.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/62.svg', '', 1, '2025-01-20 00:36:31', NULL),
(158, 'Curva muy cerrada a la izquierda', 'Advertencia de Peligro', 'Estas señales se utilizan para advertir la proximidad de una curva de aproximadamente 180 grados.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/63.svg', '', 1, '2025-01-20 00:36:31', NULL),
(159, 'Pendiente fuerte de bajada', 'Advertencia de Peligro', 'Es utilizada para advertir la proximidad de una pendiente fuerte de bajada. Esta señal puede estar complementada con una placa que contenga el porcentaje de dicha pendiente, expresado en números enteros.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/64.svg', '', 1, '2025-01-20 00:36:31', NULL),
(160, 'Pendiente fuerte de subida', 'Advertencia de Peligro', 'Es usada para advertir la proximidad de una pendiente fuerte de subida. Esta señal puede estar unida con una placa que contenga el porcentaje de dicha pendiente, expresado en números enteros.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/65.svg', '', 1, '2025-01-20 00:36:31', NULL),
(161, 'Pendiente fuerte de bajada', 'Advertencia de Peligro', 'Es utilizada para advertir la proximidad de una pendiente fuerte de bajada. Esta señal puede estar complementada con una placa que contenga el porcentaje de dicha pendiente, expresado en números enteros. ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/66.svg', '', 1, '2025-01-20 00:36:31', NULL),
(162, 'Pendiente fuerte de subida', 'Advertencia de Peligro', 'Es usada para advertir la proximidad de una pendiente fuerte de subida. Esta señal puede estar unida con una placa que contenga el porcentaje de dicha pendiente, expresado en números enteros.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/67.svg', '', 1, '2025-01-20 00:36:31', NULL),
(163, 'Resalto', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de un resalto o de un reductor de velocidad en la superficie de la calzada.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/68.svg', '', 1, '2025-01-20 00:36:31', NULL),
(164, 'Resaltos sucesivos', 'Advertencia de Peligro', 'Esta señal se emplea para advertir la proximidad de una secuencia de resaltos en la superficie de la calzada  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/69.svg', '', 1, '2025-01-20 00:36:31', NULL),
(165, 'Badén', 'Advertencia de Peligro', 'Se utiliza para advertir a los conductores de la proximidad de una irregularidad física de tipo cóncavo en la superficie de la vía, la cual puede representar riesgos para la conducción lo que obliga a tomar precauciones. ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/70.svg', '', 1, '2025-01-20 00:36:31', NULL),
(166, 'Angostamiento a ambos lados', 'Advertencia de Peligro', 'Se usa para prevenir la proximidad de un estrechamiento de la vía a ambos lados.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/71.svg', '', 1, '2025-01-20 00:36:31', NULL),
(167, 'Angostamiento a la derecha', 'Advertencia de Peligro', 'Se usa para señalar la proximidad de un estrechamiento de la vía al costado derecho de la calzada.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/72.svg', '', 1, '2025-01-20 00:36:31', NULL),
(168, 'Puente angosto', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de un puente u otra obra civil, cuyo ancho total disponible es menor que el que tiene el resto de la vía..  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/73.svg', '', 1, '2025-01-20 00:36:31', NULL),
(169, 'Ensanchamiento a ambos lados', 'Advertencia de Peligro', 'Se utiliza para advertir al conductor de un ensanche de la calzada a ambos lados.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/74.svg', '', 1, '2025-01-20 00:36:31', NULL),
(170, 'Ensanchamiento a la derecha', 'Advertencia de Peligro', 'Se utiliza para advertir al conductor de un ensanche de la calzada al costado derecho.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/75.svg', '', 1, '2025-01-20 00:36:31', NULL),
(171, 'Ensanchamiento a la izquierda', 'Advertencia de Peligro', 'Se utiliza para advertir al conductor de un ensanche de la calzada al costado izquierdo.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/76.svg', '', 1, '2025-01-20 00:36:31', NULL),
(172, 'Angostamiento a la izquierda', 'Advertencia de Peligro', 'Se usa para señalar la proximidad de un estrechamiento de la vía al costado derecho de la calzada.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/77.svg', '', 1, '2025-01-20 00:36:31', NULL),
(173, 'Peso máximo', 'Advertencia de Peligro', 'Se utiliza para advertir que más adelante en la vía existe un puente, viaducto u otra estructura en la que sólo se permite la circulación de vehículos cuyo peso total no exceda de \"X\" toneladas.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/78.svg', '', 1, '2025-01-20 00:36:31', NULL),
(174, 'Altura máxima', 'Advertencia de Peligro', 'Se utiliza para advertir que más adelante en la vía existe una restricción de altura en un túnel, puente, paso a desnivel, u otros.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/79.svg', '', 1, '2025-01-20 00:36:31', NULL),
(175, 'Ancho máximo', 'Advertencia de Peligro', 'Esta señal se emplea para señalar el ancho máximo que permite cualquier elemento del sistema vial que constituye un impedimento a la circulación de ciertos vehículos.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/80.svg', '', 1, '2025-01-20 00:36:31', NULL),
(176, 'Largo máximo', 'Advertencia de Peligro', 'Se utiliza para advertir que más adelante en la vía, los anchos de ésta y/o sus radios de curvatura, impiden la circulación con seguridad de vehículos cuyo largo es superior a \"X\" metros.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/81.svg', '', 1, '2025-01-20 00:36:31', NULL),
(177, 'Cruces, bifurcaciones y convergencias', 'Advertencia de Peligro', 'Sirve para indicar la proximidad de una calle que cruza en forma perpendicular la vía por la cual un conductor transita, de tal forma de disminuir la velocidad, estando atento para evitar algún accidente.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/82.svg', '', 1, '2025-01-20 00:36:31', NULL),
(178, 'Cruces, bifurcaciones y convergencias', 'Advertencia de Peligro', 'Es utilizada para advertir a los conductores la proximidad de un cruce en \"T\". En el ejemplo, se muestran flujos equivalentes.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/83.svg', '', 1, '2025-01-20 00:36:31', NULL),
(179, 'Cruces, bifurcaciones y convergencias', 'Advertencia de Peligro', 'Estas señales se utilizan cuando es necesario advertir sobre empalmes sucesivos.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/66da25edd513e830956963.svg', '', 1, '2025-01-20 00:36:31', NULL),
(180, 'Cruces, bifurcaciones y convergencias', 'Advertencia de Peligro', 'Esta señal se utiliza cuando es necesario advertir sobre una bifurcación.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/85.svg', '', 1, '2025-01-20 00:36:31', NULL),
(181, 'Cruces, bifurcaciones y convergencias', 'Advertencia de Peligro', 'Estas señales se utilizan cuando es necesario advertir a los conductores sobre flujos convergentes.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/86.svg', '', 1, '2025-01-20 00:36:31', NULL),
(182, 'Cruces, bifurcaciones y convergencias', 'Advertencia de Peligro', 'Advierte de la proximidad de un empalme lateral, donde el flujo más importante se indica con un trazo más ancho que el de flujo secundario', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/87.svg', '', 1, '2025-01-20 00:36:31', NULL),
(183, 'Cruce ferroviario a nivel sin barreras', 'Advertencia de Peligro', 'Es utilizada para alertar a los conductores de la proximidad de un cruce de trenes a nivel, el cual no posee barreras.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/88.svg', '', 1, '2025-01-20 00:36:31', NULL),
(184, 'Cruce ferroviario a nivel con barreras', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de un cruce ferroviario a nivel, provisto de barreras accionadas manualmente o en forma automática.  ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/89.svg', '', 1, '2025-01-20 00:36:31', NULL),
(185, 'Cruz de San Andrés', 'Advertencia de Peligro', 'Se utiliza como señal complementaria a la señal de cruce ferroviario, se instala lo más cerca posible de la vía férrea.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/90.svg', '', 1, '2025-01-20 00:36:31', NULL),
(186, 'Proximidad rotonda', 'Advertencia de Peligro', 'Está instalada para avisar al conductor de la proximidad de una rotonda, por lo cual debe reducir la velocidad y ceder el paso antes de ingresar a la misma.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/91.svg', '', 1, '2025-01-20 00:36:31', NULL),
(187, 'Carretelas en la vía', 'Advertencia de Peligro', 'Es usada para prevenir a los conductores de la probable presencia de carretas de tracción animal en la vía. Su lenta circulación y poca visibilidad nocturna pueden dar motivos de peligros.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/92.svg', '', 1, '2025-01-20 00:36:31', NULL),
(188, 'Dos sentidos de tránsito', 'Advertencia de Peligro', 'Es usada para indicar a los conductores que se encuentran circulando por una vía de un sentido, que más adelante el tránsito será de dos sentidos.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/93.svg', '', 1, '2025-01-20 00:36:31', NULL),
(189, 'Animales en la vía', 'Advertencia de Peligro', 'Se usa para alertar a los conductores de vehículos de la posible presencia de animales en la vía, sean domésticos o de ganado. ', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/94.svg', '', 1, '2025-01-20 00:36:31', NULL),
(190, 'Animales indómitos', 'Advertencia de Peligro', 'Se emplea para advertir la posible presencia de animales indómitos en la vía y debe ser reiterada si la eventual presencia de estos animales se extiende por más de 2 km.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/95.svg', '', 1, '2025-01-20 00:36:31', NULL),
(191, 'Ciclistas en la vía', 'Advertencia de Peligro', 'Se utiliza para advertir la probable presencia de ciclistas en la vía.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/96.svg', '', 1, '2025-01-20 00:36:31', NULL),
(192, 'Zona de peatones', 'Advertencia de Peligro', 'Se usa para advertir la probable presencia de peatones en la vía.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/97.svg', '', 1, '2025-01-20 00:36:31', NULL),
(193, 'Maquinaria agrícola', 'Advertencia de Peligro', 'Es usada para advertir, la probable presencia en la vía de maquinaría agrícola, cuya lenta circulación o dimensiones puede ser motivo de peligro.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/98.svg', '', 1, '2025-01-20 00:36:31', NULL),
(194, 'Proximidad de paso de cebra', 'Advertencia de Peligro', 'Se utiliza, para advertir la proximidad de un cruce peatonal. Se instala antes del paso de cebra. donde el peatón tiene siempre prioridad.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/99.svg', '', 1, '2025-01-20 00:36:31', NULL),
(195, 'Zona de escuela', 'Advertencia de Peligro', 'Se usa para indicar a los conductores la posible presencia de escolares en la vía, por la existencia de colegios.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/100.svg', '', 1, '2025-01-20 00:36:31', NULL),
(196, 'Pavimento resbaladizo', 'Advertencia de Peligro', 'Se instala para indicar la existencia de pavimento resbaladizo en la vía, situación que se agrava con el agua.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/101.svg', '', 1, '2025-01-20 00:36:31', NULL),
(197, 'Niños Jugando', 'Advertencia de Peligro', 'Se utiliza para indicar a los conductores la posible presencia de niños jugando en la vía o en sus proximidades.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/102.svg', '', 1, '2025-01-20 00:36:31', NULL),
(198, 'Proyección de gravilla', 'Advertencia de Peligro', 'Se utiliza para prevenir la presencia de grava o material suelto que puede ser proyectado por los vehículos, dañando a terceros.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/103.svg', '', 1, '2025-01-20 00:36:31', NULL),
(199, 'Proximidad de semáforo', 'Advertencia de Peligro', 'Se utiliza para indicar la proximidad de una intersección semaforizada, cuando ésta constituye una situación puntual y aislada en la vía, por lo tanto, inesperada para el conductor.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/104.svg', '', 1, '2025-01-20 00:36:31', NULL),
(200, 'Proximidad de señal pare', 'Advertencia de Peligro', 'Advierte la proximidad de una señal PARE, cuando ésta corresponde a una situación puntual y aislada en la vía y, por lo tanto, inesperada. Se justifica también en lugares donde, temporal o permanentemente, la distancia de visibilidad de dicha señal es inadecuada.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/105.svg', '', 1, '2025-01-20 00:36:31', NULL),
(201, 'Proximidad de señal ceda el paso', 'Advertencia de Peligro', 'Advierte la proximidad de una señal CEDA EL PASO, cuando ésta corresponde a una situación puntual y aislada en la vía y, por lo tanto, inesperada. Se justifica también en lugares donde, temporal o permanentemente, la distancia de visibilidad de dicha señal es inadecuada.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/106.svg', '', 1, '2025-01-20 00:36:31', NULL),
(202, 'Proximidad de cables alta tensión', 'Advertencia de Peligro', 'Es utilizada para alertar la proximidad de cables de alta tensión colgados a una altura igual o inferior a 10 m, medidos respecto del nivel de la calzada.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/107.svg', '', 1, '2025-01-20 00:36:31', NULL),
(203, 'Proximidad de túnel', 'Advertencia de Peligro', 'Es utilizada para alertar a los conductores que se aproximan a un túnel.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/108.svg', '', 1, '2025-01-20 00:36:31', NULL),
(204, 'Zona de derrumbes', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de zonas de derrumbes o rodados, con posible desprendimiento de materiales y su presencia en la vía', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/651f4bb01c267406199099.png', '', 0, '2025-01-20 00:36:31', '2025-02-14 04:00:07'),
(205, 'Ribera sin protección', 'Advertencia de Peligro', 'Se utiliza para advertir la proximidad de un río, muelle o malecón, cuya ribera no se encuentra adecuadamente protegida o apartada de la vía.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/110.svg', '', 1, '2025-01-20 00:36:31', NULL),
(206, 'Aeropuerto o aeródromo', 'Advertencia de Peligro', 'Se utiliza en las proximidades de aeropuertos y/o aeródromos cuando la vía por la que se transita cruza el eje de despegue o aterrizaje por lo que resulta probable la presencia de aviones volando a baja altura sobre la vía.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/111.svg', '', 1, '2025-01-20 00:36:31', NULL),
(207, 'Viento lateral', 'Advertencia de Peligro', 'Es utilizada para indicar la probable existencia de vientos laterales fuertes, que pueden afectar la estabilidad de vehículos livianos.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/112.svg', '', 1, '2025-01-20 00:36:31', NULL),
(208, 'Desnivel severo', 'Advertencia de Peligro', 'Se usa para advertir la existencia de un tramo de vía que presenta un desnivel severo entre pistas adyacentes o entre la calzada y la berma.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/113.svg', '', 1, '2025-01-20 00:36:31', NULL),
(209, 'Peligro', 'Advertencia de Peligro', 'Se usa para advertir la proximidad de un peligro o riesgo no susceptible de ser prevenido. Se complementa con una placa que contiene una leyenda que especifica la naturaleza del peligro.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/114.svg', '', 1, '2025-01-20 00:36:31', NULL),
(210, 'Barrera', 'Advertencia de Peligro', 'Su aplicación puede ser: Permanente: Se usa para indicar el punto donde finaliza una vía o rampa. Temporal: Se usa para prevenir el cierre momentáneo de la vía en un cruce ferroviario o peaje.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/115.svg', '', 1, '2025-01-20 00:36:31', NULL),
(211, 'Inicio de Mediana', 'Advertencia de Peligro', 'Esta señal se utiliza para advertir a los conductores que más adelante se inicia la mediana.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/193.svg', '', 0, '2025-01-20 00:36:31', '2025-02-14 04:00:13'),
(212, 'Fin de Mediana', 'Advertencia de Peligro', 'Esta señal se utiliza para advertir a los conductores que más adelante se termina la mediana transformándose la calzada por la cual se circula en una calzada bidireccional.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/194.svg', '', 0, '2025-01-20 00:36:31', '2025-02-14 04:00:17'),
(213, 'Cruce de Ciclistas', 'Advertencia de Peligro', 'Esta señal advierte a los conductores de vehículos motorizados la proximidad de un cruce con una cicloruta.', 'https://s3.amazonaws.com/educacionvial/vich_files/material2-senales-transito/195.svg', '', 0, '2025-01-20 00:36:31', '2025-03-08 00:52:45');

-- --------------------------------------------------------

--
-- Table structure for table `senales_banners`
--

CREATE TABLE `senales_banners` (
  `id_senal_banner` int NOT NULL,
  `header_imagen` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `header_texto` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `footer_banner_imagen` varchar(1000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `senales_banners`
--

INSERT INTO `senales_banners` (`id_senal_banner`, `header_imagen`, `header_texto`, `footer_banner_imagen`, `created_at`, `updated_at`) VALUES
(1, 'https://storage.googleapis.com/senales_transito/709797233019_WhatsApp Image 2025-02-03 at 15.46.51 (1).jpeg', 'Text admi', 'https://storage.googleapis.com/senales_transito/862631137741_WhatsApp Image 2025-01-04 at 12.33.38 (2).jpeg', '2025-02-06 13:58:59', '2025-03-11 04:26:32'),
(2, 'https://storage.googleapis.com/senales_transito/709797233019_WhatsApp Image 2025-02-03 at 15.46.51 (1).jpeg', 'Text admina', 'https://storage.googleapis.com/senales_transito/862631137741_WhatsApp Image 2025-01-04 at 12.33.38 (2).jpeg', '2025-02-06 13:58:59', '2025-03-11 04:26:59');

-- --------------------------------------------------------

--
-- Table structure for table `senales_categorias`
--

CREATE TABLE `senales_categorias` (
  `id_senal_categoria` int NOT NULL,
  `categoria` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish2_ci NOT NULL,
  `imagen` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `senales_categorias`
--

INSERT INTO `senales_categorias` (`id_senal_categoria`, `categoria`, `descripcion`, `imagen`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Reglamentarias', 'Las Señales de Tránsito Reglamentarias tienen por finalidad notificar a los usuarios de las vías las prioridades en el uso de las mismas, así como las prohibiciones, restricciones, obligaciones y autorizaciones existentes. Su transgresión constituye infracción a las normas\nde tránsito.', 'https://s3.amazonaws.com/educacionvial/vich_files/categoria2/600845758653d412941740.svg', 1, '2025-02-08 20:12:21', '2025-02-09 17:24:10'),
(2, 'Advertencia de Peligro', 'Las señales de tránsito de advertencia de peligro advierten a los usuarios la existencia y naturaleza de riesgos y/o situaciones imprevistas presentes en la vía o en sus zonas adyacentes, ya sea en forma permanente o temporal. Suelen denominarse también Señales Preventivas﻿', 'https://s3.amazonaws.com/educacionvial/vich_files/categoria2/60295224658dd694290921.svg', 1, '2025-02-08 20:12:30', '2025-02-09 17:24:34'),
(3, 'Informativas - Autopistas y Ciclovías', 'Tienen como propósito orientar y guiar a los usuarios del sistema vial, entregándoles la información necesaria&nbsp;para que puedan llegar a sus destinos de la forma más segura, simple y directa posible.', 'https://s3.amazonaws.com/educacionvial/vich_files/categoria2/6008460121bd6940816451.svg', 1, '2025-02-08 20:12:35', '2025-02-09 17:24:58'),
(4, 'Atractivo Turístico', 'Las \"Señales de Tránsito de Atractivo Turístico\" son las que contienen otra\ninformación de interés, como servicios, atractivos turísticos presentes en la zona y otros. Son de forma cuadrada o rectangular y generalmente de color café.', 'https://s3.amazonaws.com/educacionvial/vich_files/categoria2/600846445783b536811521.svg', 1, '2025-02-08 20:12:43', '2025-02-09 17:25:11'),
(5, 'Consejos a Peatones', 'Durante su desplazamiento por la vía pública hay situaciones de riesgo que usted puede minimizar siguiendo algunos importantes consejos como los que entregamos a continuación. RECUÉRDELOS SIEMPRE!!', 'https://www.educacionvial.cl/images/cache/thumb_74_74/categoria2/61ba3be18187b978964996.png', 0, '2025-02-08 20:12:49', '2025-03-01 15:39:43');

-- --------------------------------------------------------

--
-- Table structure for table `senales_puntaje`
--

CREATE TABLE `senales_puntaje` (
  `id_senal_puntaje` int NOT NULL,
  `id_usuario` int NOT NULL,
  `juego` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `categoria` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `puntaje` int NOT NULL,
  `tiempo` int NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `senales_puntaje`
--

INSERT INTO `senales_puntaje` (`id_senal_puntaje`, `id_usuario`, `juego`, `categoria`, `puntaje`, `tiempo`, `activo`, `created_at`, `updated_at`) VALUES
(1, 1, 'Elige bien', 'todas', 35, 20, 1, '2025-03-10 22:44:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sesiones_usuarios`
--

CREATE TABLE `sesiones_usuarios` (
  `id_sesion_usuario` int NOT NULL,
  `id_usuario` int NOT NULL,
  `dispositivo` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `device_id` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `token` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `sesiones_usuarios`
--

INSERT INTO `sesiones_usuarios` (`id_sesion_usuario`, `id_usuario`, `dispositivo`, `device_id`, `token`, `activo`, `created_at`, `updated_at`) VALUES
(9, 1, 'ios', 'emulator', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rpdm8iOjEsImlkX3VzdWFyaW8iOjEsImlkX2VtcHJlc2EiOjEsIm5vbWJyZSI6IkFkbWluaXN0cmFkb3IiLCJwYXNzd29yZCI6IiQyeSQxMCROL0RKSzdkM2VPdC5DSE8yOWh2anh1Sm1WWXU4NWM0bnV5RWxvWEF1eGhlTjZLcU5yS3QxNiIsImVtYWlsIjoiYWRtaW5Ac2VuYWxlcy5jbCIsImNlbHVsYXIiOjk1MTM0MTc2OCwiZW1haWxfY29uZmlybWF0aW9uIjoxLCJsb2dnZWRfaW4iOjEsInJvbGUiOjAsImxvZ29fZW1wcmVzYSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIyLTEwLTE5VDA5OjUyOjQ4LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0wNlQwODo0Mjo0Ni4wMDBaIiwiaWF0IjoxNzQxODIwNDk2LCJleHAiOjE4MzY0OTMyOTZ9.fbhtLJiAOT6GzV2dnl8w8zKM5StysZJGPzC8ik7CAIU', 0, '2025-03-12 23:01:36', '2025-03-12 23:41:17'),
(12, 1, 'ios', 'emulator', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rpdm8iOjEsImlkX3VzdWFyaW8iOjEsImlkX2VtcHJlc2EiOjEsIm5vbWJyZSI6IkFkbWluaXN0cmFkb3IiLCJwYXNzd29yZCI6IiQyeSQxMCROL0RKSzdkM2VPdC5DSE8yOWh2anh1Sm1WWXU4NWM0bnV5RWxvWEF1eGhlTjZLcU5yS3QxNiIsImVtYWlsIjoiYWRtaW5Ac2VuYWxlcy5jbCIsImNlbHVsYXIiOjk1MTM0MTc2OCwiZW1haWxfY29uZmlybWF0aW9uIjoxLCJsb2dnZWRfaW4iOjEsInJvbGUiOjAsImxvZ29fZW1wcmVzYSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIyLTEwLTE5VDA5OjUyOjQ4LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0wNlQwODo0Mjo0Ni4wMDBaIiwiaWF0IjoxNzQxODIyNjkyLCJleHAiOjE4MzY0OTU0OTJ9.yCvqH1Pyfwba9UMKbV_s-zKK1UCgRsMlr_S_9f4ez0E', 0, '2025-03-12 23:38:12', '2025-03-12 23:41:17'),
(16, 1, 'ios', '21G93', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rpdm8iOjEsImlkX3VzdWFyaW8iOjEsImlkX2VtcHJlc2EiOjEsIm5vbWJyZSI6IkFkbWluaXN0cmFkb3IiLCJwYXNzd29yZCI6IiQyeSQxMCROL0RKSzdkM2VPdC5DSE8yOWh2anh1Sm1WWXU4NWM0bnV5RWxvWEF1eGhlTjZLcU5yS3QxNiIsImVtYWlsIjoiYWRtaW5Ac2VuYWxlcy5jbCIsImNlbHVsYXIiOjk1MTM0MTc2OCwiZW1haWxfY29uZmlybWF0aW9uIjoxLCJsb2dnZWRfaW4iOjEsInJvbGUiOjAsImxvZ29fZW1wcmVzYSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIyLTEwLTE5VDA5OjUyOjQ4LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0xMlQyMDo0MjozNC4wMDBaIiwiaWF0IjoxNzQxOTA3MDcxLCJleHAiOjE4MzY1Nzk4NzF9.c6doChS3d-lp7zeQ26BmYZ0pbSHAovrRkDUGO86pMJA', 1, '2025-03-13 23:04:31', NULL),
(17, 1, 'ios', 'emulator', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rpdm8iOjEsImlkX3VzdWFyaW8iOjEsImlkX2VtcHJlc2EiOjEsIm5vbWJyZSI6IkFkbWluaXN0cmFkb3IiLCJwYXNzd29yZCI6IiQyYiQxMCRZdFY0c2p3ZXVCOTNtVjQ5U201ZDQuWVJNZmtaV0tXMG14OUFDcGZMN1VybVVoL0ZaTnY2RyIsImVtYWlsIjoiYWRtaW5Ac2VuYWxlcy5jbCIsImNlbHVsYXIiOjk1MTM0MTc2OCwiZW1haWxfY29uZmlybWF0aW9uIjoxLCJsb2dnZWRfaW4iOjEsInJvbGUiOjAsImxvZ29fZW1wcmVzYSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIyLTEwLTE5VDA5OjUyOjQ4LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0xNFQxMTo1OTozOS4wMDBaIiwiaWF0IjoxNzQxOTY0NDE2LCJleHAiOjE4MzY2MzcyMTZ9.t2gi26cXw8WRJVImkU17O8-gPwppeeZ3Zqc3mx2NVXg', 1, '2025-03-14 15:00:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `suscripciones`
--

CREATE TABLE `suscripciones` (
  `id_suscripcion` int NOT NULL,
  `dispositivo` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `product_id` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `rango_dias` int NOT NULL,
  `precio_clp` int NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `suscripciones`
--

INSERT INTO `suscripciones` (`id_suscripcion`, `dispositivo`, `product_id`, `rango_dias`, `precio_clp`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'ios', 'sub_senales_transito_001', 7, 490, 1, '2025-02-25 10:28:54', '2025-03-10 23:19:00'),
(2, 'ios', 'sub_senales_transito_002', 30, 490, 1, '2025-02-25 10:28:54', '2025-03-10 23:19:01'),
(3, 'ios', 'sub_senales_transito_002', 90, 490, 1, '2025-02-25 10:28:54', '2025-03-10 23:18:19'),
(4, 'android', 'sub-android-senales-transito-001', 7, 490, 1, '2025-02-25 10:28:54', '2025-03-10 23:19:22'),
(5, 'android', 'sub-android-senales-transito-002', 30, 490, 1, '2025-02-25 10:28:54', '2025-03-10 23:19:24'),
(6, 'android', 'sub-android-senales-transito-003', 90, 490, 1, '2025-02-25 10:28:54', '2025-03-10 23:19:25');

-- --------------------------------------------------------

--
-- Table structure for table `suscripciones_eventos`
--

CREATE TABLE `suscripciones_eventos` (
  `id_suscripcion_evento` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_suscripcion` int NOT NULL,
  `product_id` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `transaction_id` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `platform` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `receipt` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha_inicio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha_fin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suscripciones_usuarios`
--

CREATE TABLE `suscripciones_usuarios` (
  `id_suscripcion_usuario` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_suscripcion` int NOT NULL,
  `product_id` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `transaction_id` varchar(1000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `original_transaction_id` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `platform` varchar(1000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha_inicio` int NOT NULL,
  `fecha_fin` int NOT NULL,
  `receipt` varchar(1000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `id_empresa` int NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `apellido` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `celular` int NOT NULL,
  `role` int NOT NULL,
  `logged_in` int NOT NULL,
  `email_confirmation` int NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `id_empresa`, `email`, `password`, `nombre`, `apellido`, `celular`, `role`, `logged_in`, `email_confirmation`, `activo`, `created_at`, `updated_at`) VALUES
(1, 1, 'admin@senales.cl', '$2b$10$YtV4sjweuB93mV49Sm5d4.YRMfkZWKW0mx9ACpfL7UrmUh/FZNv6G', 'Administrador', '', 951341768, 0, 1, 1, 1, '2022-10-19 12:52:48', '2025-03-14 14:59:39'),
(2, 1, 'felipe@ia.cl', '$2y$10$N/DJK7d3eOt.CHO29hvjxuJmVYu85c4nuyEloXAuxheN6KqNrKt16', 'Felipe', '', 0, 10, 1, 0, 1, '2024-05-23 19:02:54', '2024-12-08 02:21:25'),
(98, 1, 'waldo@expo.cl', '$2y$10$N/DJK7d3eOt.CHO29hvjxuJmVYu85c4nuyEloXAuxheN6KqNrKt16', 'Waldo', '', 0, 10, 1, 0, 1, '2024-05-23 19:02:54', '2024-12-08 02:21:26'),
(99, 1, 'hola@hola.cl', '$2b$10$vlP7PvWdKkxKv0J9BChrVexQ03DfbIf4U.5W4px13Ok8YzFQbjrA2', 'Felipe', '', 0, 10, 0, 0, 1, '2025-01-08 20:34:06', NULL),
(100, 1, 'email@conf.cl', '$2b$10$zGUxVdE7JPMm.QCd7tWk4.RJvY3mowj.mlew5pQrIZfU55QwoUA9a', 'Nombre', 'Apellido', 0, 10, 0, 0, 0, '2025-02-09 17:58:28', '2025-02-25 20:39:39'),
(101, 1, 'em@em.cl', '$2b$10$ExDnDbDKxnTxTRk1LgTj9emW2WilxKeZmWVh4x0h2YVVE4HUzk0A2', 'Nomb', 'Apeo', 0, 10, 0, 0, 1, '2025-02-09 17:59:16', NULL),
(102, 1, 'dsfsdf@cl.cl', '$2b$10$bAhyQkqUx3vJNYcOEHfla.VrxxFWJYaKxkDpXFYyti750vdR1EvCG', 'Tete', 'Tete', 0, 10, 0, 0, 1, '2025-02-11 01:04:50', NULL),
(103, 1, 'fdfsf@gc.cl', '$2b$10$XXAZ3VrGOWeG2z.52n5lZevjkvHyDY52cRZuyVBVvxWZV2TWD.EmW', 'Dfds', 'Fdsf', 0, 10, 0, 1, 1, '2025-03-08 00:35:49', '2025-03-08 00:42:26'),
(105, 1, 'tikif38831@isorax.com', '$2b$10$dJKbVV9OoNE6BfjWHVbOM.tX8wayMlVuBsp0aFvOaZ6dDeL.TUQTO', '1', '1', 0, 10, 0, 1, 1, '2025-03-14 13:12:30', '2025-03-14 13:13:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`id_amigo`);

--
-- Indexes for table `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indexes for table `passwords_reset`
--
ALTER TABLE `passwords_reset`
  ADD PRIMARY KEY (`id_password_reset`);

--
-- Indexes for table `senales`
--
ALTER TABLE `senales`
  ADD PRIMARY KEY (`id_senal`);

--
-- Indexes for table `senales_banners`
--
ALTER TABLE `senales_banners`
  ADD PRIMARY KEY (`id_senal_banner`);

--
-- Indexes for table `senales_categorias`
--
ALTER TABLE `senales_categorias`
  ADD PRIMARY KEY (`id_senal_categoria`);

--
-- Indexes for table `senales_puntaje`
--
ALTER TABLE `senales_puntaje`
  ADD PRIMARY KEY (`id_senal_puntaje`);

--
-- Indexes for table `sesiones_usuarios`
--
ALTER TABLE `sesiones_usuarios`
  ADD PRIMARY KEY (`id_sesion_usuario`);

--
-- Indexes for table `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD PRIMARY KEY (`id_suscripcion`);

--
-- Indexes for table `suscripciones_eventos`
--
ALTER TABLE `suscripciones_eventos`
  ADD PRIMARY KEY (`id_suscripcion_evento`);

--
-- Indexes for table `suscripciones_usuarios`
--
ALTER TABLE `suscripciones_usuarios`
  ADD PRIMARY KEY (`id_suscripcion_usuario`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amigos`
--
ALTER TABLE `amigos`
  MODIFY `id_amigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id_empresa` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `passwords_reset`
--
ALTER TABLE `passwords_reset`
  MODIFY `id_password_reset` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT for table `senales`
--
ALTER TABLE `senales`
  MODIFY `id_senal` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT for table `senales_banners`
--
ALTER TABLE `senales_banners`
  MODIFY `id_senal_banner` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `senales_categorias`
--
ALTER TABLE `senales_categorias`
  MODIFY `id_senal_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `senales_puntaje`
--
ALTER TABLE `senales_puntaje`
  MODIFY `id_senal_puntaje` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sesiones_usuarios`
--
ALTER TABLE `sesiones_usuarios`
  MODIFY `id_sesion_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `suscripciones`
--
ALTER TABLE `suscripciones`
  MODIFY `id_suscripcion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `suscripciones_eventos`
--
ALTER TABLE `suscripciones_eventos`
  MODIFY `id_suscripcion_evento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `suscripciones_usuarios`
--
ALTER TABLE `suscripciones_usuarios`
  MODIFY `id_suscripcion_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
