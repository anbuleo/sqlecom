import express from 'express'
import Connect from  './src/config/db.js'
import router from  './src/Router/router.js'
import cors from 'cors'


const app =express()

app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.send("hello world!")
})


app.use('/api',router)


app.use((err,req,res,next)=>{
    console.log(err.message)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})



app.listen(8000,()=>console.log('working done'))