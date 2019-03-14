CREATE KEYSPACE IF NOT EXISTS adidas
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

DROP TABLE IF EXISTS adidas.looks;

USE adidas;

CREATE TABLE adidas.looks ( 
  id int PRIMARY KEY,
  pant_name text, 
  pant_url text,
  pant_price int,
  shirt_name text,
  shirt_url text,
  shirt_price int,
  jacket_name text,
  jacket_url text,
  jacket_price int,
  );

COPY adidas.looks(id, pant_name, pant_url, pant_price, shirt_name, shirt_url, shirt_price, jacket_name, jacket_url, jacket_price) FROM '/Users/bmortimer/dev/sdc/bill-product-details/database/looksdata.csv';

-- COPY adidas.looks(id, pant_name, pant_url, pant_price, shirt_name, shirt_url, shirt_price, jacket_name, jacket_url, jacket_price) FROM '/Users/bmortimer/dev/sdc/bill-product-details/database/shortLooksData.csv';