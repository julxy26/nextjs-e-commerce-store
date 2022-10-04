CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(100) NOT NULL,
  price varchar(10) NOT NULL
);


INSERT INTO products
  (title, price)
VALUES
  ( 'Pokemon cosplay with hoodie', '40' ),
  ( 'Sailor Moon full cosplay', '50' ),
  ( 'Sherlock Holmes cape dog cosplay', '35' ),
  ( 'Japanese Kimono dog costume in floral print', '40' );


SELECT * FROM products;
