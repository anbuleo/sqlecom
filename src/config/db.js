import mysql from 'mysql2/promise'

import env from 'dotenv'

env.config()


const Connect = mysql.createPool({
    host: process.env.Mysql_host,
    user:process.env.Mysql_user,
    password: process.env.Mysql_pass,
    database: process.env.Mysql_database

})


// Connect.connect((err)=>{
//     if(err){
//         console.error("Error connecting to MySQL:", err);
//         return;
//       }
//       console.log("Connected to MySQL");
// })





export default Connect