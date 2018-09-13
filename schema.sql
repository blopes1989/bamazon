drop database if exists bamazon;
create database bamazon;
use bamazon;

create table list(
item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
 );

insert into list (product_name, department_name, price, stock_quantity)
values ("Apples", "food", "1", "200"),
("Bicycles", "outdoors","99", "18"),
("Couches", "indoors","499.99", "6"),
("Diamond", "jewlery","9999.90", "666"),
("Eggplant", "food", ".70", "123"),
("Football", "sports","24", "777"),
("Globe", "indoors","15", "44"),
("Hippo", "outdoors","50000", "2"),
("Iphone", "tech","1000", "999"),
("Jam", "food", "5", "100");

