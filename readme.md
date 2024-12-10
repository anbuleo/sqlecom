  ### Create a database named ecommerce.
# _# _ Create three tables: customers, orders, and products.
 // Create Customers Table
            
              CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                address VARCHAR(255),
                
              )
            
      
            // Create Products Table
            await db.execute(`
              CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                description TEXT,
               
              )
           
      
            // // Create Orders Table
           
              CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_id INT NOT NULL,
                order_date DATE,
                total_amount DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE )
           

=>>>Retrieve all customers who have placed an order in the last 30 days.

  let query = "SELECT o.*, c.name AS customer_name FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.order_date >= CURDATE() - INTERVAL 30 DAY;"

=>>>Get the total amount of all orders placed by each customer.

     let query = "select customer_id, sum(total_amount) as total, c.name as names  from orders o join customers c on c.id = o.customer_id  group by customer_id "

=>>Update the price of Product C to 45.00.

      let query = "update products set price = ?  where  name like ? "

=>>>Add a new column discount to the products table.



### Add a new column discount to the products table.



   alter table products add column discount int;

   ## Retrieve the top 3 products with the highest price.


   select name,price from products order by price  desc limit 3 

   ___Get the names of customers who have ordered Product A.___

   select p.name as names , o.customer_id from orders o join products p on p.id= o.product_id where p.name like "productA";
#### Join the orders and customers tables to retrieve the customer's name and order date for each order.

select c.name as customer_name,o.order_date as ordered_date from orders o join customers c on customer_id = c.id;
##### Retrieve the orders with a total amount greater than 150.00.

select * from orders where total_amount > 150;


### Normalize the database by creating a separate table for order items and updating the orders table to reference the order_items table.

CREATE TABLE order_items (    id INT AUTO_INCREMENT PRIMARY KEY,order_id INT NOT NULL,product_id INT NOT NULL, quantity INT NOT NULL, price DECIMAL(10,2) NOT NULL,FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE);