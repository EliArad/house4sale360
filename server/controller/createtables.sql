use yad2vr;

CREATE TABLE `renthouseblobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tableid` int(11) DEFAULT NULL,
  `filename` varchar(250) NOT NULL,
  `is360image` int(11) DEFAULT NULL,
  `is360video` int(11) DEFAULT NULL,
  `isvideo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;



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
  `homephone` int(11) DEFAULT NULL,
  `officephone` int(11) DEFAULT NULL,
  `secondarycellphone` int(11) DEFAULT NULL,
  `primarycellphone` int(11) DEFAULT NULL,
  `napa` varchar(145) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `housenumber` int(11) DEFAULT NULL,
  `parkingType` varchar(145) DEFAULT NULL,
  `email` varchar(245) DEFAULT NULL,
  `contactPerson` varchar(100) DEFAULT NULL,
  `renovated` varchar(75) DEFAULT NULL,
  `renovatedexplnation` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `area` (`area`),
  KEY `dateenter` (`dateenter`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;


CREATE TABLE `salehouseblobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tableid` int(11) DEFAULT NULL,
  `filename` varchar(250) NOT NULL,
  `is360image` int(11) DEFAULT NULL,
  `is360video` int(11) DEFAULT NULL,
  `isvideo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;



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
  `homephone` int(11) DEFAULT NULL,
  `officephone` int(11) DEFAULT NULL,
  `secondarycellphone` int(11) DEFAULT NULL,
  `primarycellphone` int(11) DEFAULT NULL,
  `napa` varchar(145) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `housenumber` int(11) DEFAULT NULL,
  `parkingType` varchar(145) DEFAULT NULL,
  `email` varchar(245) DEFAULT NULL,
  `contactPerson` varchar(100) DEFAULT NULL,
  `renovated` varchar(75) DEFAULT NULL,
  `renovatedexplnation` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `area` (`area`),
  KEY `dateenter` (`dateenter`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;




CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `agent` bit(1) DEFAULT NULL,
  `password` varchar(400) DEFAULT NULL,
  `userguid` varchar(528) DEFAULT NULL,
  `host` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
