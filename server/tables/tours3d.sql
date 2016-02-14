CREATE TABLE `tours3d` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `tableid3d` int(11) DEFAULT NULL,
  `show` int(1) DEFAULT NULL,
  `expireddate` date DEFAULT NULL,
  `autoplay` int(1) DEFAULT NULL,
  `wide` int(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
