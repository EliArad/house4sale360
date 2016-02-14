CREATE TABLE `visitors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` datetime DEFAULT NULL,
  `guid` varchar(145) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `ip` varchar(100) DEFAULT '0.0.0.0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid_UNIQUE` (`guid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
