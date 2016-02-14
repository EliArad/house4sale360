CREATE TABLE `contactus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(75) DEFAULT NULL,
  `freetext` varchar(500) NOT NULL,
  `email` varchar(45) NOT NULL,
  `Dated` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
