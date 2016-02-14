CREATE TABLE `usersearch` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userguid` varchar(145) CHARACTER SET latin1 DEFAULT NULL,
  `city` varchar(85) DEFAULT NULL,
  `numofrooms` int(4) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `propertytype` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `userguid_UNIQUE` (`userguid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
