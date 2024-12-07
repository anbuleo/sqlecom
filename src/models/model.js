import db from '../config/db.js'



const User = {
    createTable : async()=>{
        const sql = 'CREATE TABLE IF NOT EXISTS Customers (id INT AUTO_INCREMENT PRIMARY KEY UNIQUE, NAME TEXT,EMAIL TEXT , ADDRESS TEXT)'
        await db.execute(sql)
    }
   
}







export default User