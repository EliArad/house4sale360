CREATE TABLE `renthouseblobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tableid` int(11) DEFAULT NULL,
  `filename` varchar(250) NOT NULL,
  `is360image` int(11) DEFAULT NULL,
  `is360video` int(11) DEFAULT NULL,
  `isvideo` int(11) DEFAULT NULL,
  `filesize` int(11) DEFAULT NULL,
  `description` varchar(145) DEFAULT NULL,
  `filefullpath` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
