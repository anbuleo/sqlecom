import db from '../config/db.js'



const User = {
    createTable : async()=>{
        try {
            // Create Customers Table
            await db.execute(`
              CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                address VARCHAR(255),
                
              )
            `);
      
            // Create Products Table
            await db.execute(`
              CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                description TEXT,
               
              )
            `);
      
            // // Create Orders Table
            await db.execute(`
              CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_id INT NOT NULL,
                order_date DATE,
                total_amount DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
              )`);
      
            console.log("Tables created successfully!");
          } catch (error) {
            console.error("Error creating tables:", error.message);
          }
       
       
    },
   
   
}








export default User