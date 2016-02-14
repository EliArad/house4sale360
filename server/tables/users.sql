CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `agent` varchar(45) NOT NULL DEFAULT '0',
  `password` varchar(400) CHARACTER SET latin1 NOT NULL,
  `userguid` varchar(528) CHARACTER SET latin1 DEFAULT NULL,
  `host` varchar(145) CHARACTER SET latin1 DEFAULT NULL,
  `suspend` int(1) DEFAULT '0',
  `verified` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userguid_UNIQUE` (`userguid`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
