use yad2vr;

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(75) DEFAULT NULL,
  `freetext` varchar(500) NOT NULL,
  `email` varchar(45) NOT NULL,
  `Dated` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `tours3d` (
  `ID` int(11) NOT NULL,
  `tableid3d` int(11) DEFAULT NULL,
  `show` int(1) DEFAULT NULL,
  `expireddate` date DEFAULT NULL,
  `autoplay` int(1) DEFAULT NULL,
  `wide` int(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `renthouseblobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tableid` int(11) DEFAULT NULL,
  `filename` varchar(250) NOT NULL,
  `is360image` int(11) DEFAULT NULL,
  `is360video` int(11) DEFAULT NULL,
  `isvideo` int(11) DEFAULT NULL,
  `filesize` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;




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
  `animals` int(2) DEFAULT NULL,
  `furnatures` int(2) DEFAULT NULL,
  `furnaturedetails` varchar(500) DEFAULT NULL,
  `romates` int(2) DEFAULT NULL,
  `messagetype` int(2) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `area` (`area`),
  KEY `dateenter` (`dateenter`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;




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




CREATE TABLE `salehouseblobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tableid` int(11) DEFAULT NULL,
  `filename` varchar(250) NOT NULL,
  `is360image` int(11) DEFAULT NULL,
  `is360video` int(11) DEFAULT NULL,
  `isvideo` int(11) DEFAULT NULL,
  `filesize` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8;



 CREATE TABLE `sellhousedetails` (
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
   `privacyPassword` varchar(4) DEFAULT '0000',
   `privacyEnabled` int(1) DEFAULT '0',
   `messagetype` int(2) DEFAULT '0',
   PRIMARY KEY (`id`),
   KEY `area` (`area`),
   KEY `dateenter` (`dateenter`)
 ) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8;


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `agent` varchar(45) NOT NULL DEFAULT '0',
  `password` varchar(400) CHARACTER SET latin1 DEFAULT NULL,
  `userguid` varchar(528) CHARACTER SET latin1 DEFAULT NULL,
  `host` varchar(145) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` datetime DEFAULT NULL,
  `guid` varchar(145) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid_UNIQUE` (`guid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `storage` (
  `userid` int(11) NOT NULL,
  `size` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid_UNIQUE` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;