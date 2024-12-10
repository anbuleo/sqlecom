import User from '../models/model.js';
import db from '../config/db.js'



const createCustomerTable = async(req,res)=>{
    try {
        await User.createTable()
        res.status(201).json({msg:'Customer create success'})
    } catch (error) {
        res.status(500).json({error})
        console.log(error.message)
    }
}
const productNameExist = async(name)=>{
    let user = false
    try {
        let query = 'SELECT name FROM products WHERE  name LIKE ?;'
        let [row] = await db.query(query,[name])
        if(row.length>0){
            user=true
        }
        return user
    } catch (error) {
        console.log(error)
    }
}

const createProduct = async(req,res,next)=>{
    try {
        let {name,price,description} = req.body


        let avoid = await productNameExist(name)

        if(avoid){
            res.status(400).json({message:' product name already Exist'})
            return
        }else{
            let query = 'INSERT INTO products (name,price,description) values(?,?,?)';
            let [result] =   await db.query(query,[name,price,description])
      
            res.status(201).json({message: 'product added sucess',id:result.insteredId})
        }
    
      

       


        
    } catch (error) {
        next(error)
    }
}
const getUser = async(email)=>{
    let user = false
    try {
        let query = 'SELECT email FROM customers WHERE  email LIKE ?;'
        let [row] = await db.query(query,[email])
        if(row.length>0){
            user=true
        }
        return user
    } catch (error) {
        console.log(error)
    }
}

const addCustomer = async(req,res,next) => {
    try {
        let {name,email,address} = req.body
       
    //     let isEmailQuery  = `SELECT email FROM customers WHERE email LIKE ${email}`

    //    let x =  await db.execute(isEmailQuery)
    //     console.log(x)
    let user  =await getUser(email)
    if(user){
        res.status(400).json({message:' user already Exist'})
        return
    }else{
        let query = 'INSERT INTO customers (name,email,address) values(?,?,?)';
        let [result] =   await db.query(query,[name,email,address])
  
        res.status(201).json({message: 'customer added sucess',id:result.insteredId})
    }

  

        
       



    } catch (error) {
        console.log(error)
        // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ success: false, message: 'Email must be unique!' });
      } else {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
}

const CheckUser =async(id,pid)=>{
    try {
        let userName = false
        let productId = false

        let [row] = await db.query('SELECT id FROM customers where id like ?' , [id])
        let [rows] = await db.query('SELECT id FROM products where id like ?' , [pid])
        // console.log(row,rows)

        if(row.length > 0 && rows.length >0){
            userName = true
            productId = true
        } else if(row.length > 0 && rows.length ==0){
            userName = true
            productId = false
        }else if(row.length == 0 && rows.length >0){
            userName = false
            productId = true
        }
        return [userName,productId]

    } catch (error) {
        console.log(error)
    }
}


const addOrder  = async(req,res,next)=>{
        try {
            let {customer_id,order_date,total_amount,product_id} = req.body

            let x =await CheckUser(customer_id,product_id)

            let date =new Date().toISOString().split('T')[0];
           
            let query ="INSERT INTO orders (customer_id,order_date,total_amount,product_id) values(?,?,?,?)"

            if(x[0]==true && x[1]==true){
                    let [result] = await db.query(query,[customer_id,order_date?order_date:date,total_amount,product_id])
                    res.status(201).json({message:'order created sucess',id:result.insertId})

            }else if(x[0]==true && x[1]==false){
                res.status(400).json({message:'product id not match'})
            }else if(x[0]==false && x[1]==true){
                res.status(400).json({message:'customer id not match'})
            }else{
                res.status(400).json({message : "product id and customer id not match"})
            }



            
        } catch (error) {
            next(error)
            
        }
}


//all customer who are all placed order in last 30 days

const isLastdate = async()=>{

    try {
        let [x] =await db.query("SELECT order_date FROM orders order by order_date desc limit 1 ")
       return x
    } catch (error) {
        console.log(error)
    }
}


const shortBydate = async(req,res,next)=>{
    try {

        //last 30 day query

        let query = "SELECT o.*, c.name AS customer_name FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.order_date >= CURDATE() - INTERVAL 30 DAY;"

        // let lastDate = await isLastdate()
        let[result]  = await db.query(query)

        res.status(200).json({message:"last 30 day customer placed order",data:result})



      
        
    } catch (error) {
        next(error)
    }
}

//Get the total amount of all orders placed by each customer.

let getAllsum = async(req,res,next)=>{
    try {
        let query = "select customer_id, sum(total_amount) as total, c.name as names  from orders o join customers c on c.id = o.customer_id  group by customer_id "
        let [result] = await db.query(query)
        res.status(200).json({message:"The customer total purchase by individual ",data:result})
    } catch (error) {
        next(error)
    }
}

//Update the price of Product C to 45.00.

const findbyname = async(name)=>{
    try {
        let [res] = await db.query("SELECt * FROM products WHERE name like ?",[name])

        return res
        
    } catch (error) {
        console.log(error)
    }
}


const updatePrice =async(req,res,next)=>{
    try {
        let {name,price} = req.body
        let query = "update products set price = ?  where  name like ? "

        let[result]=await db.query(query,[price,name])

        if(result.changedRows ==1){
            let get = await findbyname(name)

        res.status(200).json({message:'product updated success',data:get})
        }else{
            res.status(400).json({message:'product not changed'})
        }
        

        


        
    } catch (error) {
        next(error)
    }
}
const gettopprice  = async(req,res,next)=>{
    try {
        let [result] = await db.query("select name,price from products order by price  desc limit 3 ;")
        res.status(200).json({message:"here top there highest price product",data:result})
    } catch (error) {
        next(error)
    }
}
const joincutomerandproduct  = async(req,res,next)=>{
    try {
        let [result] = await db.query("select c.name as customer_name,o.order_date as ordered_date from orders o join customers c on customer_id = c.id;")
        res.status(200).json({message:"joinoperation",data:result})
    } catch (error) {
        next(error)
    }
}
const totalhighretrive  = async(req,res,next)=>{
    try {
        let [result] = await db.query("select * from orders where total_amount > 150;")
        res.status(200).json({message:"here top there highest price product",data:result})
    } catch (error) {
        next(error)
    }
}
const average  = async(req,res,next)=>{
    try {
        let [result] = await db.query("select customer_id ,avg(total_amount) as average from orders group by customer_id;")
        res.status(200).json({message:"avarge of product",data:result})
    } catch (error) {
        next(error)
    }
}
const getproductorderbyname  = async(req,res,next)=>{
    try {
        let {name} = req.body

        let findname =await findbyname(name)
        // console.log(findname)
        if(findname.length>0){
            let [result] = await db.query("select p.name as names , o.customer_id from orders o join products p on p.id= o.product_id where p.name like ?",[name])
        res.status(200).json({message:"here top there highest price product",data:result})
        }else{
            res.status(400).json({message:"Name not found"})
        }
        
    } catch (error) {
        next(error)
    }
}



export default {
    createCustomerTable,
    addCustomer,
    createProduct,
    addOrder,
    shortBydate,
    updatePrice,
    gettopprice,
    getproductorderbyname,
    joincutomerandproduct,
    totalhighretrive,
    average,
    getAllsum
}


// alter user "root"@"localhost" identified with mysql_native_password by 'root123';