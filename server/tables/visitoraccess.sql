CREATE TABLE `visitoraccess` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` varchar(245) NOT NULL,
  `tableid` int(11) NOT NULL,
  `accesstoken` varchar(4) DEFAULT '0000',
  `type` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid_UNIQUE` (`guid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
