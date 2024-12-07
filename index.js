import express from 'express'
import db from  './src/config/db.js'
import router from  './src/routes/router'
import cors from 'cors'


const app =express()

app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.send("hello world!")
})
db()

// app.use('/api',router)




app.listen(8000,()=>console.log('working done'))