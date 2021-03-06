CREATE TABLE `renthousedetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `propertyType` varchar(45) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `neighborhood` varchar(100) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `fromfloor` int(11) DEFAULT '0',
  `squresize` int(11) DEFAULT NULL,
  `balcony` int(11) DEFAULT '0',
  `aircond` varchar(100) DEFAULT NULL,
  `parking` int(11) DEFAULT '0',
  `handycupt` int(11) DEFAULT '0',
  `mamad` bit(1) DEFAULT b'0',
  `warehouse` int(11) DEFAULT '0',
  `elevator` int(11) DEFAULT '0',
  `soragim` int(11) DEFAULT '0',
  `price` int(11) DEFAULT '0',
  `dateenter` date DEFAULT NULL,
  `immidiate` int(11) DEFAULT NULL,
  `callonsaturday` int(11) DEFAULT NULL,
  `freedetails` varchar(1000) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `numberofrooms` int(11) DEFAULT NULL,
  `yearsofproperty` int(11) DEFAULT NULL,
  `parkingtype2` varchar(45) DEFAULT NULL,
  `homephone` varchar(15) DEFAULT NULL,
  `officephone` varchar(15) DEFAULT NULL,
  `secondarycellphone` varchar(15) DEFAULT NULL,
  `primarycellphone` varchar(15) DEFAULT NULL,
  `napa` varchar(145) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `housenumber` int(11) DEFAULT NULL,
  `parkingType` varchar(145) DEFAULT NULL,
  `email` varchar(245) DEFAULT NULL,
  `contactPerson` varchar(100) DEFAULT NULL,
  `renovated` varchar(75) DEFAULT NULL,
  `renovatedexplnation` varchar(245) DEFAULT NULL,
  `suspend` tinyint(4) DEFAULT NULL,
  `privacyPassword` varchar(4) DEFAULT '4414',
  `privacyEnabled` int(1) DEFAULT '0',
  `animals` int(2) DEFAULT NULL,
  `furnatures` int(2) DEFAULT NULL,
  `furnaturedetails` varchar(500) DEFAULT NULL,
  `romates` int(2) DEFAULT NULL,
  `messagetype` int(2) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `area` (`area`),
  KEY `dateenter` (`dateenter`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
